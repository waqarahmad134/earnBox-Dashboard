import React, { useState } from 'react';
import axios from 'axios';
import GetAPI from '../utilities/GetAPI';
import { PostAPI } from '../utilities/PostAPI';
import { BASE_URL } from '../utilities/URL';
import DefaultLayout from '../layout/DefaultLayout';
import TableThree from '../components/Tables/TableThree';
import { inputStyle, labelStyle } from '../utilities/Input';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
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

export default function Products() {
  const { data, reFetch } = GetAPI('admin/get_products');
  const allUsers = GetAPI('admin/get_all');
  const productCategories = GetAPI('admin/product_categories');
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [addProduct, setAddProduct] = useState({
    title: '',
    price: '',
    description: '',
    ProductCategoryId: '',
    UserId: '',
    isFeatured: '1',
    image: '',
    images: [],
  });
  const catOption = allUsers?.data?.data?.data?.filter(
    (data) => data.id === parseInt(addProduct.UserId),
  )?.[0]?.userType;

  const [addModal, setAddModal] = useState(false);
  const closeAddModal = () => {
    setAddModal(false);
    setAddProduct({
      title: '',
    });
  };
  const onChange = (e) => {
    if (e.target.type === 'file') {
      if (e.target.name === 'image') {
        setAddProduct({ ...addProduct, image: e.target.files[0] });
      } else if (e.target.name === 'images') {
        setAddProduct({ ...addProduct, images: [...e.target.files] });
      }
    } else {
      setAddProduct({ ...addProduct, [e.target.name]: e.target.value });
    }
  };

  function handleClick(id) {
    axios.get(BASE_URL + `admin/updateProductStatus/${id}`).then((dat) => {
      reFetch();
      if (dat?.data?.status === '1') {
        info_toaster(dat?.data?.message);
      } else {
        error_toaster(dat?.data?.message);
      }
    });
  }
  function updateFeatured(id) {
    axios.get(BASE_URL + `admin/updateFeatured/${id}`).then((dat) => {
      reFetch();
      if (dat?.data?.status === '1') {
        info_toaster(dat?.data?.message);
      } else {
        error_toaster(dat?.data?.message);
      }
    });
  }

  const addProductFunc = async (e) => {
    e.preventDefault();
    const {
      title,
      price,
      description,
      ProductCategoryId,
      UserId,
      isFeatured,
      image,
      images,
    } = addProduct;

    if (title === '') {
      info_toaster('Please Enter Title');
    } else if (price === '') {
      info_toaster('Please Enter Price');
    } else if (description === '') {
      info_toaster('Please Enter Description');
    } else if (ProductCategoryId === '') {
      info_toaster('Please Select Product Category');
    } else if (UserId === '') {
      info_toaster('Please Select User');
    } else if (isFeatured === '') {
      info_toaster('Please Select Feature Status');
    } else if (!image) {
      info_toaster('Please Upload Main Image');
    } else if (images.length === 0) {
      info_toaster('Please Upload At Least One Additional Image');
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('ProductCategoryId', ProductCategoryId);
      formData.append('UserId', UserId);
      formData.append('isFeatured', isFeatured);
      formData.append('image', image);
      images.forEach((file) => {
        formData.append('images', file);
      });

      try {
        let res = await PostAPI('admin/addProduct', formData);
        if (res?.data?.status === '1') {
          reFetch();
          setLoader(false);
          success_toaster(res?.data?.message);
          setAddModal(false);
          setAddProduct({
            title: '',
            price: '',
            description: '',
            ProductCategoryId: '',
            UserId: '',
            isFeatured: '',
            image: '',
            images: [],
          });
        } else {
          setLoader(false);
          info_toaster(res?.data?.message);
        }
      } catch (error) {
        setLoader(false);
        console.error(error);
        info_toaster('An error occurred while adding the product.');
      }
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Products" />
      <button
        onClick={() => setAddModal(true)}
        className="py-2.5 px-4 rounded bg-black text-white font-medium border mb-6"
      >
        Add New Product
      </button>
      <Modal onClose={closeAddModal} isOpen={addModal} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>
              <h1 className="text-center">Add Product</h1>
            </ModalHeader>
            <ModalCloseButton />
            {loader ? (
              <div className="h-[160px]">Loading</div>
            ) : (
              <ModalBody>
                <div className="space-y-5">
                  <div className="flex gap-x-4">
                    <div className="space-y-1 w-full">
                      <label className={labelStyle} htmlFor="title">
                        Product Name
                      </label>
                      <input
                        value={addProduct?.title}
                        onChange={onChange}
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Product Name"
                        className={inputStyle}
                      />
                    </div>
                    <div className="space-y-1 w-full">
                      <label className={labelStyle} htmlFor="price">
                        Product Price
                      </label>
                      <input
                        value={addProduct?.price}
                        onChange={onChange}
                        type="number"
                        name="price"
                        id="price"
                        placeholder="Product Price"
                        className={inputStyle}
                      />
                    </div>
                  </div>
                  <div className="flex gap-x-4">
                    <div className="space-y-1 w-full">
                      <label className={labelStyle} htmlFor="description">
                        Product Description
                      </label>
                      <input
                        value={addProduct?.description}
                        onChange={onChange}
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Product Name"
                        className={inputStyle}
                      />
                    </div>
                    <div className="space-y-1 w-full">
                      <label className={labelStyle} htmlFor="isFeatured">
                        Featured Product
                      </label>
                      <select
                        className={inputStyle}
                        onChange={onChange}
                        name="type"
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-x-4">
                    <div className="space-y-1 w-full">
                      <label className={labelStyle} htmlFor="description">
                        Select Tailor / Shop
                      </label>
                      <select
                        className={inputStyle}
                        onChange={onChange}
                        name="UserId"
                      >
                        <option>Select Tailor / Shop</option>
                        {allUsers?.data?.data?.data?.map((data, index) => (
                          <option key={index} value={data?.id}>
                            {data?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {catOption === "shop" ? "" : (
                    <div className="space-y-1 w-full">
                      <label className={labelStyle} htmlFor="isFeatured">
                        Select Product Category
                      </label>
                      <select
                        className={inputStyle}
                        onChange={onChange}
                        name="ProductCategoryId"
                      >
                        <option>Select Product Category</option>
                        {productCategories?.data?.data?.data?.map(
                          (data, index) => (
                            <option key={index} value={data?.id}>
                              {data?.title}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                    )}
                  </div>

                  <div className="space-y-1 w-full">
                    <label className={labelStyle} htmlFor="image">
                      Image
                    </label>
                    <input
                      onChange={onChange}
                      type="file"
                      name="image"
                      id="image"
                      placeholder="image"
                      className={inputStyle}
                    />
                  </div>
                  <div className="space-y-1 w-full">
                    <label className={labelStyle} htmlFor="images">
                      Images
                    </label>
                    <input
                      onChange={onChange}
                      type="file"
                      name="images"
                      id="images"
                      placeholder="images"
                      className={inputStyle}
                      multiple={true}
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
                  onClick={addProductFunc}
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
      <div className="flex flex-col gap-10">
        <TableThree
          updateFeatured={updateFeatured}
          onClick={handleClick}
          data={data?.data?.data}
        />
      </div>
    </DefaultLayout>
  );
}
