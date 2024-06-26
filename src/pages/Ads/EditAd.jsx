import React, { useState } from 'react';
import { PostAPI } from '../../utilities/PostAPI';

import { inputStyle, labelStyle } from '../../utilities/Input';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { info_toaster, success_toaster } from '../../utilities/Toaster';
import { useLocation, useNavigate } from 'react-router-dom';
import GetAPI from '../../utilities/GetAPI';

export default function EditAd() {
  const getPackages  = GetAPI('admin/v1/getPackages');
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const location = useLocation();
  const data = location.state?.data;
  const [editAd, setEditAd] = useState({
    id: data?.id,
    title: data?.title,
    packageId: data?.packageId,
  });

 
  const onChange = (e) => {
    setEditAd({ ...editAd, [e.target.name]: e.target.value });
  };

  const editAdFunc = async (e) => {
    e.preventDefault();
    const { title, packageId } = editAd;
    if (title === '') {
      info_toaster('Please Enter Name');
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append('id', editAd.id);
      formData.append('title', title);
      formData.append('packageId', packageId);
      try {
        let res = await PostAPI('admin/v1/editAd', {
          id: editAd.id,
          title : title,
          packageId : packageId,
        });
        if (res?.data?.status === '1') {
          setLoader(false);
          success_toaster(res?.data?.message);
          navigate('/ad');
        } else {
          setLoader(false);
          info_toaster(res?.data?.message);
        }
      } catch (error) {
        setLoader(false);
        console.error(error);
        info_toaster('An error occurred while adding the ad.');
      }
    }
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Edit Ad" />
        <form>
          <div className="space-y-5">
            <div className="flex gap-x-4">
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="title">
                  Title
                </label>
                <input
                  value={editAd?.title}
                  onChange={onChange}
                  type="text"
                  name="title"
                  id="title"
                  className={inputStyle}
                />
              </div>
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="packageId">
                  Package
                </label>
                <select
                  value={editAd?.packageId}
                  onChange={onChange}
                  type="text"
                  name="packageId"
                  id="packageId"
                  className={inputStyle}
                >
                  {getPackages?.data?.data?.data?.map((data, index) => (
                    <option key={index} value={data?.id}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <div className="space-y-1 w-full">
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
            </div> */}
          </div>
          <div className="flex justify-end gap-x-2 my-4">
            <button
              type="submit"
              onClick={editAdFunc}
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
