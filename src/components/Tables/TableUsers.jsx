import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { Navigate, useNavigate } from 'react-router-dom';

export default function TableUsers(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = props?.data?.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleDeleteConfirmation = (userId) => {
    const confirmDelete = window.confirm('Confirm Delete This User?');
    if (confirmDelete) {
      props.deleteUser(userId);
    } else {
      return;
    }
  };

  const handleView = (data) => {
    navigate('/user-details', { state: data });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search users..."
          className="mb-5 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-primary-dark"
        />
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Phone
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {user.firstName} {user.lastName}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {user.phoneNum}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.email}</p>
                  </td>
                  <td className="capitalize border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <label className="inline-flex items-center me-5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={user.status}
                        onChange={() => props.onClick(user.id)}
                      />
                      <div
                        className={`relative w-11 h-6 bg-red-400 rounded-full peer ${
                          user.status ? 'bg-teal-600' : 'dark:bg-gray-700'
                        } peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800`}
                      >
                        <div
                          className={`after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-green-200 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${
                            user.status ? 'after:border-white' : ''
                          } ${
                            user.status
                              ? 'after:translate-x-full rtl:after:-translate-x-full'
                              : ''
                          }`}
                        ></div>
                      </div>
                    </label>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center justify-center space-x-3.5">
                      <button
                        onClick={() => handleDeleteConfirmation(user.id)}
                        className="hover:text-primary"
                      >
                        <IoTrashOutline size={24} />
                      </button>

                      <div
                        onClick={() => handleView(user)}
                        className="bg-gray-2 rounded-full p-2"
                      >
                        <FaEye size={24} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
