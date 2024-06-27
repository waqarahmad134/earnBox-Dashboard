import React, { useEffect, useState } from 'react';
import { PostAPI } from '../../utilities/PostAPI';
import { inputStyle, labelStyle } from '../../utilities/Input';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { info_toaster, success_toaster } from '../../utilities/Toaster';
import GetAPI from '../../utilities/GetAPI';

export default function AddAd() {
  const { data, reFetch } = GetAPI('admin/v1/getPackages');
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [ad, setAd] = useState({
    title: '',
    packageId: '',
  });

  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      setAd((prevAd) => ({
        ...prevAd,
        packageId: data.data.data[0].id
      }));
    }
  }, [data]);

  const onChange = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.value });
  };

  const adFunc = async (e) => {
    e.preventDefault();
    const { title, packageId } = ad;
    if (title === '') {
      info_toaster('Please Enter Name');
    } else {
      setLoader(true);
      try {
        let res = await PostAPI('admin/v1/addNewAd', {
          title: title,
          packageId: packageId,
        });
        if (res?.data?.status === '1') {
          setLoader(false);
          success_toaster(res?.data?.message);
          setAd(prevAd => ({
            ...prevAd,
            title: newTitle,
          }));
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
        <Breadcrumb pageName="Add Ad's" />
        <form>
          <div className="space-y-5">
            <div className="flex gap-x-4">
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="title">
                  Title
                </label>
                <input
                  value={ad?.title}
                  onChange={onChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  className={inputStyle}
                />
              </div>
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="packageId">
                  Package
                </label>
                <select
                  value={ad?.packageId}
                  onChange={onChange}
                  type="text"
                  name="packageId"
                  id="packageId"
                  className={inputStyle}
                >
                  {data?.data?.data?.map((data, index) => (
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
              onClick={adFunc}
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
