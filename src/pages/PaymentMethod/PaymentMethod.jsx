import React from 'react';
import GetAPI from '../../utilities/GetAPI';
import DefaultLayout from '../../layout/DefaultLayout';
import TableThree from '../../components/Tables/TableThree';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function PaymentMethod() {
  const navigate = useNavigate();
  const { data, reFetch } = GetAPI('admin/v1/getPaymentMethod');

  const handleDelete = (id) => {
    alert(id);
  };

  const handleEdit = (data) => {
    navigate('/edit-payment-method', { state: data });
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Payment Methods" />
      <div className="mb-6">
        <Link
          to={'/add-payment-method'}
          className="py-2.5 px-4 rounded bg-black text-white font-medium border "
        >
          Add Payment Method
        </Link>
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

                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                    Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Account No
                  </th>

                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Created Date
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.data?.map((paymentMeth, key) => (
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{key + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {paymentMeth?.name}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {paymentMeth?.accountNo}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {paymentMeth?.createdAt}
                      </p>
                    </td>
                    <td className="space-x-3 border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <button
                        onClick={() => handleEdit(paymentMeth)}
                        className="text-black dark:text-white"
                      >
                        <FaEdit size={24} />
                      </button>
                      <button
                        onClick={() => handleDelete(paymentMeth?.id)}
                        className="text-black dark:text-white"
                      >
                        <FaTrash size={22} />
                      </button>
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
