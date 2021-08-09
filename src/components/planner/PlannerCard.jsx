import React from 'react'
import Tippy from '@tippyjs/react'

function PlannerCard() {
  return (
    <div className="grid w-full grid-cols-12 gap-2 p-4 mb-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
      <div className="flex flex-col justify-between col-span-3">
        <div className="">
          <h5 className="font-semibold">{"title"}</h5>
          <h5 className="text-sm">
            <strong className="font-semibold">Plan: </strong>
            {"plan"}
          </h5>
        </div>
        {/* <div className="flex mt-1">
          {Object.keys(assignments).map((obj) => {
            return <Person className="mr-2" key={obj} userId={obj} />;
          })}
        </div> */}
      </div>
      <div className="grid grid-cols-12 col-span-9">
        <div className="col-span-11">
          <p className="text-sm">{"desc"}</p>
        </div>
        <div className="flex items-center justify-end col-span-1">
          <Tippy
            offset={[0, 2]}
            placement={"top"}
            delay={[500, 0]}
            content={<span>Agregar al R.A</span>}
          >
            <button
              className="px-2 py-1 mr-2 rounded-full focus:outline-none hover:bg-gray-200"
            // onClick={() => {
            //   handleAddTask();
            // }}
            >
              <i className="text-black fas fa-exchange-alt fa-md hover:text-blue-600"></i>
            </button>
          </Tippy>
        </div>
      </div>
    </div>
  )
}

export default PlannerCard
