import React, { useContext, useEffect } from "react";
import { CartContext } from "../Components/context/cartContext";
import { MdDelete } from "react-icons/md";
export default function Cart() {
  //  will get the cart items from the context
  // will check if the cart is empty or not
  const { cartItems, increseQuantity, removeCartItem, decreseQuantity } =
    useContext(CartContext);
  console.log(cartItems);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="cart mt-40 sm:mt-52 
    box-shadow sm:shadow-md h-auto w-50  mx-auto px-10 py-5 container rounded-md sm:shadow-black/70 mb-10 flex flex-col flex-start "
    >
      <h1 className="text-3xl font-bold text-start text-black mb-3">
        Order Summary
      </h1>
      {cartItems.length > 0 ? (
        <div className="wapper">
          {/* Items will be here */}
          {cartItems.map((item) => {
            return (
              <div
                key={item.title}
                className="Wrapper flex justify-between  items-center border-t-2 border-border "
              >
                <div className="rightSide mt-5 py-5 flex gap-5">
                  {" "}
                  <div className="image  ">
                    <img
                      className="w-28"
                      src={item.images[0]}
                      alt={item.title}
                    />
                  </div>
                  <div className="content py-4">
                    <div className="title font-bold capitalize text-sm sm:text-lg lg:text-lg ">
                      {item.title}
                    </div>
                    {/* Price */}
                    <div className="price py-1 text-gray-400">
                      ${item.price}
                    </div>
                    <div className="controller Quantity">
                      <button
                        className="remove bg-gray-200 border border-gray-400/20 px-2"
                        onClick={() => decreseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className=" bg-gray-200 border border-gray-400/20 px-2 ">
                        {item.quantity}
                      </span>
                      <button
                        className="add  bg-gray-200 border border-gray-400/20 px-2"
                        onClick={() => increseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {/* Delete Button here will Deleted item from the cart "LocalStorage" */}
                <div className="leftSide">
                  <button>
                    <MdDelete
                      className="text-red-600  size-[35px] flex justify-center items-center rounded-md relative sm:right-16 hover:size-[40px] transition-all"
                      onClick={() => removeCartItem(item.id)}
                    />
                  </button>
                </div>
              </div>
            );
          })}
          <div className="Total flex justify-between mx-6 border-b-2 border-border pb-2 mt-2">
            <h1 className="text-2xl font-bold text-end text-black">Total : </h1>
            <h1 className="text-2xl font-bold text-end text-black mt-4 ">
              $
              {cartItems.reduce(
                // will calculate the total price the old cuantity + the new quantity * number of items
                (acc, item) => parseInt(acc + item.price * item.quantity),
                0
              )}
            </h1>
          </div>
          <div className="mx-6">
            <button className=" bg-main/80 text-xl font-normal text-white rounded-md flex justify-center items-center  mt-5 w-full hover:bg-main transition-all py-2 mx-auto outline-none focus:outline-none ">
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-2xl font-italic text-start text-gray-600 flex justify-center items-center h-60">
          Cart is Empty
        </h1>
      )}
    </div>
  );
}
