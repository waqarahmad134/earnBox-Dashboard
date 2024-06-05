import React, { useState } from 'react';
import GetAPI from '../utilities/GetAPI';
import { PostAPI } from '../utilities/PostAPI';
import { DeleteAPI } from '../utilities/DelAPI';
import { PutAPI } from '../utilities/PutAPI';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { FaEdit } from 'react-icons/fa';
import { IoTrash } from 'react-icons/io5';
import { inputStyle, labelStyle } from '../utilities/Input';
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from '../utilities/Toaster';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_URL } from '../utilities/URL';


export default function ShopCategories() {
    const { data, reFetch } = GetAPI('admin/shopCategories');
    const [loader, setLoader] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [addProdCat, setAddProdCat] = useState({
      title: '',
    });
    const [updateProdCat, setUpdateProdCat] = useState({
      title: '',
      id: '',
    });
    const [addModal, setAddModal] = useState(false);
    const closeAddModal = () => {
      setAddModal(false);
      setAddProdCat({
        title: '',
      });
    };
    const [updateModal, setUpdateModal] = useState(false);
    const closeUpdateModal = () => {
      setUpdateModal(false);
      setUpdateProdCat({
        title: '',
        id: '',
      });
    };
    const onChange = (e) => {
      setAddProdCat({ ...addProdCat, [e.target.name]: e.target.value });
    };
    const onChange2 = (e) => {
      setUpdateProdCat({ ...updateProdCat, [e.target.name]: e.target.value });
    };
    const addProdCatFunc = async (e) => {
      e.preventDefault();
      if (addProdCat.title === '') {
        info_toaster("Please Enter Category's Title");
      } else {
        setLoader(true);
        let res = await PostAPI('admin/addShopCategories', {
          title: addProdCat.title,
        });
        if (res?.data?.status === '1') {
          reFetch();
          setLoader(false);
          success_toaster(res?.data?.message);
          setAddModal(false);
          setAddProdCat({
            title: '',
          });
        } else {
          setLoader(false);
          info_toaster(res?.data?.message);
        }
      }
    };
    const updateProdCatFunc = async (e) => {
      e.preventDefault();
      if (updateProdCat.updateName === '') {
        info_toaster('Please enter your Update Name');
      } else {
        setLoader(true);
        let res = await PutAPI(`admin/editShopCategories`, {
          id: updateProdCat.id,
          title: updateProdCat.title,
        });
        console.log(res?.data);
        if (res?.data?.status === '1') {
          reFetch();
          setLoader(false);
          success_toaster(res?.data?.message);
          setUpdateModal(false);
          setUpdateProdCat({
            title: '',
            id: '',
          });
        } else {
          setLoader(false);
          error_toaster(res?.data?.message);
        }
      }
    };
  
    const deletePC = async (id) => {
      setDisabled(true);
      let res = await DeleteAPI(`admin/deleteShopCategories/${id}`);
      console.log(res?.data);
      if (res?.data?.status === '1') {
        reFetch();
        success_toaster(res?.data?.message);
      } else {
        error_toaster(res?.data?.message);
        setDisabled(false);
      }
    };
  
    function handleStatus(id) {
      axios.get(BASE_URL + `admin/updateShopCategoriesStatus/${id}`).then((dat) => {
        console.log(dat?.data);
        if (dat?.data?.status === '1') {
          reFetch();
          info_toaster(dat?.data?.message);
        } else {
          error_toaster(dat?.data?.message);
        }
      });
    }
    return (
      <div>
        <DefaultLayout>
          <Breadcrumb pageName="All Shops Categories" />
  
          <button
            onClick={() => setAddModal(true)}
            className="py-2.5 px-4 rounded bg-black text-white font-medium border mb-6"
          >
            Add Shop Category
          </button>
          <Modal onClose={closeAddModal} isOpen={addModal} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <form>
                <ModalHeader>
                  <h1 className="text-center">Add Category</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[160px]">Loading</div>
                ) : (
                  <ModalBody>
                    <div className="h-40">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="title">
                          Shop Category Name
                        </label>
                        <input
                          value={addProdCat?.title}
                          onChange={onChange}
                          type="text"
                          name="title"
                          id="title"
                          placeholder="Shop Category Name"
                          className={inputStyle}
                        />
                      </div>
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <div className="flex justify-end gap-x-2">
                    <button
                      type="button"
                      onClick={closeAddModal}
                      className="py-2.5 w-24 rounded font-medium text-sm text-themePurple border"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={addProdCatFunc}
                      disabled={disabled}
                      className="py-2.5 w-24 rounded font-medium text-sm text-white bg-graydark border"
                    >
                      Add
                    </button>
                  </div>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <Modal
            onClose={closeUpdateModal}
            isOpen={updateModal}
            size="xl"
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <form>
                <ModalHeader>
                  <h1 className="text-center">Update Shop Category</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[160px]">Loading</div>
                ) : (
                  <ModalBody>
                    <div className="h-40">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="updateName">
                          Title
                        </label>
                        <input
                          value={updateProdCat?.title}
                          onChange={onChange2}
                          type="text"
                          name="title"
                          id="updateName"
                          placeholder="Shop Category Name"
                          className={inputStyle}
                        />
                      </div>
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <div className="flex justify-end gap-x-2">
                    <button
                      type="button"
                      onClick={closeUpdateModal}
                      className="py-2.5 w-24 rounded font-medium text-sm text-themePurple border"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={updateProdCatFunc}
                      disabled={disabled}
                      className="py-2.5 w-24 rounded font-medium text-sm text-white bg-graydark border"
                    >
                      Update
                    </button>
                  </div>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <div className="flex flex-col gap-10">
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        No
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        Title
                      </th>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        Status
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.data?.map((data, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {key + 1}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {data?.title}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <button
                            onClick={() => handleStatus(data?.id)}
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              data.status === true
                                ? 'bg-success text-success'
                                : 'bg-warning text-warning'
                            }`}
                          >
                            {data.status === true ? 'Active' : 'Block'}
                          </button>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button
                              onClick={() => deletePC(data?.id)}
                              className="hover:text-primary cursor-pointer"
                            >
                              <IoTrash size={20} />
                            </button>
                            <button
                              onClick={() => {
                                setUpdateModal(true);
                                setUpdateProdCat({
                                  title: data?.title,
                                  id: data?.id,
                                });
                              }}
                              className="hover:text-primary"
                            >
                              <FaEdit size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DefaultLayout>
      </div>
    );
  }
  