import React, { useState } from 'react';
import { PostAPI } from '../../utilities/PostAPI';

import { inputStyle, labelStyle } from '../../utilities/Input';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { info_toaster, success_toaster } from '../../utilities/Toaster';

export default function AddPackage() {
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [addPackage, setAddPackage] = useState({
    name: '',
    requirements: '',
    description: '',
    adsNo: 0,
    earn: 0,
    referralBonus: 0,
    price: 0,
    validity: '',
    image: '',
  });

  const onChange = (e) => {
    if (e.target.type === 'file') {
      if (e.target.name === 'image') {
        setAddPackage({ ...addPackage, image: e.target.files[0] });
      }
    } else {
      setAddPackage({ ...addPackage, [e.target.name]: e.target.value });
    }
  };

  const addPackageFunc = async (e) => {
    e.preventDefault();
    const {
      name,
      requirements,
      description,
      adsNo,
      earn,
      referralBonus,
      price,
      validity,
      image,
    } = addPackage;
    if (name === '') {
      info_toaster('Please Enter Name');
    } else if (!image) {
      info_toaster('Please Upload Main Image');
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('requirements', requirements);
      formData.append('description', description);
      formData.append('adsNo', adsNo);
      formData.append('earn', earn);
      formData.append('referralBonus', referralBonus);
      formData.append('price', price);
      formData.append('validity', validity);
      formData.append('image', image);
      try {
        let res = await PostAPI('admin/v1/addPackage', formData);
        if (res?.data?.status === '1') {
          setLoader(false);
          success_toaster(res?.data?.message);
          setAddPackage({
            name: '',
            requirements: '',
            description: '',
            adsNo: 0,
            earn: 0,
            referralBonus: 0,
            price: 0,
            validity: '',
            image: '',
          });
        } else {
          setLoader(false);
          info_toaster(res?.data?.message);
        }
      } catch (error) {
        setLoader(false);
        console.error(error);
        info_toaster('An error occurred while adding the Package.');
      }
    }
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Add Package" />
        <form>
          <div className="space-y-5">
            <div className="flex gap-x-4">
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="name">
                  Package Name
                </label>
                <input
                  value={addPackage?.name}
                  onChange={onChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Package Name"
                  className={inputStyle}
                />
              </div>
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="requirements">
                  Package Requirements
                </label>
                <input
                  value={addPackage?.requirements}
                  onChange={onChange}
                  type="text"
                  name="requirements"
                  id="requirements"
                  placeholder="Package Requirements"
                  className={inputStyle}
                />
              </div>
            </div>
            <div className="flex gap-x-4">
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="description">
                  Package Description
                </label>
                <input
                  value={addPackage?.description}
                  onChange={onChange}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Package Description"
                  className={inputStyle}
                />
              </div>
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="adsNo">
                  No of Ads (Daily)*
                </label>
                <input
                  value={addPackage?.adsNo}
                  onChange={onChange}
                  type="text"
                  name="adsNo"
                  id="adsNo"
                  placeholder="No of ads"
                  className={inputStyle}
                />
              </div>
            </div>
            <div className="flex gap-x-4">
            <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="earn">
                  Earn
                </label>
                <input
                  value={addPackage?.earn}
                  onChange={onChange}
                  type="text"
                  name="earn"
                  id="earn"
                  placeholder="Earning"
                  className={inputStyle}
                />
              </div>
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="price">
                  Package Price (50$)*
                </label>
                <input
                  value={addPackage?.price}
                  onChange={onChange}
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  className={inputStyle}
                />
              </div>
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="validity">
                  Validity (Months)*
                </label>
                <input
                  value={addPackage?.validity}
                  onChange={onChange}
                  type="number"
                  name="validity"
                  id="validity"
                  placeholder="validity"
                  className={inputStyle}
                />
              </div>
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
          </div>
          <div className="flex justify-end gap-x-2 my-4">
            <button
              type="submit"
              onClick={addPackageFunc}
              disabled={disabled}
              className="py-2.5 w-24 rounded font-medium text-sm text-white bg-graydark border"
            >
              Submit
            </button>
          </div>
        </form>
      </DefaultLayout>
    </>
  );
}
