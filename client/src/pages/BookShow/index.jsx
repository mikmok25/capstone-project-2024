import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { GetShowById } from "../../apicalls/theatres";
import StripeCheckout from "react-stripe-checkout";
import Button from "../../components/Button";
import moment from "moment";

import { BookShowTickets, MakePayment } from "../../apicalls/bookings";

function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = React.useState(null);
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({ showId: params.id });

      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(Hideloading());
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);

    return (
      <div className="flex gap-1 flex-col p-2 card ">
        <div className="card p-2 mb-2 text-center">
          <h1 className="text-xl">SCREEN</h1>
        </div>
        {Array.from(Array(rows).keys()).map((seat, index) => {
          return (
            <div className="flex gap-1 justify-center">
              {Array.from(Array(columns).keys()).map((column, index) => {
                const seatNumber = seat * columns + column + 1;
                let seatClass = "seat";

                if (selectedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " selected-seat";
                }

                if (show.bookedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " booked-seat";
                }

                return (
                  seat * columns + column + 1 <= totalSeats && (
                    <div
                      className={seatClass + " cursor-pointer"}
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter((item) => item !== seatNumber)
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      <h1 className="text-sm">{seat * columns + column + 1}</h1>
                    </div>
                  )
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };


  const book = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await BookShowTickets({
        show: params.id,
        seats: selectedSeats,
        transactionId,
        user: user._id,
      });

      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(Hideloading());
    } catch (error) {
      message.error(error.message);
      dispatch(Hideloading());
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await MakePayment(
        token,
        selectedSeats.length * show.ticketPrice * 100 * 1.13
      );

      if (response.success) {
        message.success(response.message);
        book(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(Hideloading());
    } catch (error) {
      message.error(error.message);
      dispatch(Hideloading());
    }
  };


  useEffect(() => {
    getData();
  }, []);
  return (
    show && (
      <div>
        {/* Show Information */}

        <div className="flex justify-between card p-2 items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-sm">{show.theatre.name}</h1>
            <span className="text-sm">{show.theatre.address}</span>
          </div>

          <div>
            <h1 className="text-2xl uppercase">
              {show.movie.title} (
              {moment(show.movie.releaseDate).format("YYYY")})
            </h1>
          </div>
          <div>
            <h1 className="text-sm">
              {moment(show.date, "YYYY-MM-DD").format("MMM Do YYYY")} -{" "}
              {moment(show.time, "HH:mm").format("hh:mm A")}
            </h1>
          </div>
        </div>

        {/*  Seats */}

        <div className="flex justify-center mt-2">{getSeats()}</div>

        {selectedSeats.length > 0 && (
          <div className="mt-2 flex justify-center flex-col items-center ">
            <div className="flex flex-col mb-1">
              <p>
                Ticket Price: $
                {Math.floor(selectedSeats.length * show.ticketPrice).toFixed(2)}
              </p>
              <p>
                HST (13%): $
                {(selectedSeats.length * show.ticketPrice * 0.13).toFixed(2)}
              </p>
              <h1 className="text-md">
                Total: $
                {(selectedSeats.length * show.ticketPrice * 1.13).toFixed(2)}
              </h1>
            </div>
            <StripeCheckout
              token={onToken}
              currency="CAD"
              amount={Math.round(
                selectedSeats.length * show.ticketPrice * 100 * 1.13
              )}
              billingAddress
              stripeKey="pk_test_51QAOo0QHqRYWcQjnlt0HIaliTQkxJji6bc8a85DqEbklDFY6DyhqbotFWAIM6L0ttu4tR1ahUvU5qWksTWDXpMSG00JNodi93V"
            >
              <Button title="Book Now"></Button>
            </StripeCheckout>
          </div>
        )}
      </div>
    )
  );
}

export default BookShow;
