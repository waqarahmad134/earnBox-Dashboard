import React from 'react';
import GetAPI from '../../utilities/GetAPI';
import DefaultLayout from '../../layout/DefaultLayout';
import TableThree from '../../components/Tables/TableThree';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../../utilities/URL';
import { info_toaster, success_toaster } from '../../utilities/Toaster';

export default function WithdrawRequest() {
  const navigate = useNavigate();
  const { data, reFetch } = GetAPI('earning/v1/getAllWithdrawRequest');
  console.log("🚀 ~ WithdrawRequest ~ data:", data?.data?.history)

  function handleDelete(id) {
    axios.get(BASE_URL + `admin/v1/deletePaymentMethod/${id}`).then((dat) => {
      if (dat?.data?.status === '1') {
        success_toaster(dat?.data?.message);
      } else {
        info_toaster(dat?.data?.message);
      }
      reFetch();
    });
  }

  const handleEdit = (data) => {
    navigate('/edit-payment-method', { state: { data } });
  };

  function handlePaymentStatus(id) {
    axios.get(BASE_URL + `earning/v1/updateWithdrawStatus/${id}`).then((dat) => {
      if (dat?.data?.status === '1') {
        success_toaster(dat?.data?.message);
      } else {
        info_toaster(dat?.data?.message);
      }
      reFetch();
    });
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Payment Methods" />
      <div className="mb-6">
        {/* <Link
          to={'/add-payment-method'}
          className="py-2.5 px-4 rounded bg-black text-white font-medium border "
        >
          Add Payment Method
        </Link> */}
      </div>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    No #
                  </th>

                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Amount
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Account No
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Account Name
                  </th>

                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    User Id
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.history?.map((data, key) => (
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{key + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {data?.amount}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {data?.accountNo || "No record"}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {data?.accountName || "No record"}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {data?.status === true ? "True" : "False"}
                      </p>
                    </td>
                    <td className="space-x-3 border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                        {data?.userId} {data?.user?.firstName}
                      </p>
                      
                    </td>
                    <td className="relative capitalize border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <label className="inline-flex items-center me-5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={data?.status}
                        onChange={() => handlePaymentStatus(data?.id)}
                      />
                      <div
                        className={`relative w-11 h-6 bg-red-400 rounded-full peer ${
                          data?.status 
                            ? 'bg-orange-300'
                            : 'dark:bg-gray-700'
                        } peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800`}
                      >
                        <div
                          className={`after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-green-200 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${
                            data?.status
                              ? 'after:border-white after:translate-x-full rtl:after:-translate-x-full'
                              : ''
                          }`}
                        ></div>
                      </div>
                    </label>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
