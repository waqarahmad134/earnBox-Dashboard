import React, { useState } from 'react';
import { PostAPI } from '../../utilities/PostAPI';
import { inputStyle, labelStyle } from '../../utilities/Input';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { info_toaster, success_toaster } from '../../utilities/Toaster';

export default function AddPaymentMethod() {
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [addPackage, setAddPackage] = useState({
    name: '',
    accountNo: '',
  });

  const onChange = (e) => {
    setAddPackage({ ...addPackage, [e.target.name]: e.target.value });
  };

  const addPackageFunc = async (e) => {
    e.preventDefault();
    const { name, accountNo } = addPackage;
    if (name === '') {
      info_toaster('Please Enter Name');
    } else {
      setLoader(true);
      try {
        let res = await PostAPI('admin/v1/addPaymentMethod', {
          name,
          accountNo
        });
        if (res?.data?.status === '1') {
          setLoader(false);
          success_toaster(res?.data?.message);
          setAddPackage({
            name: '',
            accountNo: '',
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
        <Breadcrumb pageName="Add Payment Method" />
        <form>
          <div className="space-y-5">
            <div className="flex gap-x-4">
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="name">
                  Payment Method Name
                </label>
                <input
                  value={addPackage?.name}
                  onChange={onChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Method Name"
                  className={inputStyle}
                />
              </div>
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="accountNo">
                  Account No
                </label>
                <input
                  value={addPackage?.accountNo}
                  onChange={onChange}
                  type="text"
                  name="accountNo"
                  id="accountNo"
                  placeholder="Account No"
                  className={inputStyle}
                />
              </div>
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
