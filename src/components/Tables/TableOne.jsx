import React from 'react';

export default function TableOne(props) {
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          New Users
        </h4>
        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                No #
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Status
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                KYC
              </h5>
            </div>
          </div>
          {props?.data?.slice(0, 5)?.map((data, key) => (
            <div
              className="grid grid-cols-4 sm:grid-cols-4
                border-b border-stroke dark:border-strokedark"
              key={key}
            >
              <div className="flex gap-3 p-2.5 xl:p-5">
                <p>{key + 1}</p>
              </div>

              <div className="flex items-center  p-2.5 xl:p-5">
                <p className="text-black dark:text-white capitalize">{`${data?.firstName} ${data?.lastName}`}</p>
              </div>

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  {data?.status === true ? 'Active' : 'Block'}
                </p>
              </div>
              <div className="flex items-center p-2.5 xl:p-5">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    data?.kyc === true
                      ? 'bg-success text-success'
                      : 'bg-danger text-warning'
                  }`}
                >
                  {data?.kyc === true ? 'Verified' : 'Unverified'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
