import React from 'react';
import { BASE_URL } from '../../utilities/URL';

export default function TableOne(props) {
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Latest Products
        </h4>
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Image / Title
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Price
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Status
              </h5>
            </div>
          </div>

          {props?.data?.map((data, key) => (
            <div
              className="grid grid-cols-3 sm:grid-cols-3
                border-b border-stroke dark:border-strokedark"
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="h-16 w-16 object-cover">
                  <img
                    className="w-full h-full"
                    src={`${BASE_URL}${data.image}`}
                    alt="W"
                  />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {data?.title}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">${data?.price}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  {data?.status === true ? 'Active' : 'Block'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
