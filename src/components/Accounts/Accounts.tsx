import React, { FC, useCallback, useEffect, useState } from 'react';
import './_accounts.scss';
import { FcApproval } from 'react-icons/fc';
import { FiDelete } from 'react-icons/fi';
import { GrAddCircle } from 'react-icons/gr';
import { AccountModal } from '../AccountModal/AccountModal';
import { IAccountData } from '../../entities';
import axiosInstance from '../../config/axios';
import axios from 'axios';
import requests from '../../config/requests';
import { AuthState } from '../../AuthContext';
import CryptoJS from 'crypto-js';

type Props = {};

type GetAccountsResponse = {
  data: IAccountData[];
};
type GetResponse = {
  data: IAccountData;
};

export const Accounts: FC<Props> = () => {
  const { token } = AuthState();
  const [accounts, setAccounts] = useState<IAccountData[]>([]);
  const [isAddingModal, setIsAddingModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<IAccountData | null>(null);

  const handleCloseAddingModal = () => setIsAddingModal((prev) => !prev);

  const handleCloseEditModal = () => {
    setIsEditModal((prev) => !prev);
    setEditData(null);
  };

  const openEditModal = (data: IAccountData) => {
    setEditData(data);
    setIsEditModal(true);
  };

  const addAccount = async (reqData: IAccountData) => {
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        reqData.password,
        process.env.REACT_APP_SECRET_KEY ?? ''
      ).toString();
      const newData = {
        ...reqData,
        password: encryptedPassword,
      };
      const { data } = await axiosInstance.post<GetResponse>(
        requests.createAccount,
        newData
      );

      // this trick is made to get an account with Id
      const bytes = CryptoJS.AES.decrypt(
        data.data.password,
        process.env.REACT_APP_SECRET_KEY ?? ''
      );
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      setAccounts((prev) => [
        ...prev,
        { ...data.data, password: decryptedPassword },
      ]);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occured';
      }
    }
  };

  const updateAccount = async (reqData: IAccountData) => {
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        reqData.password,
        process.env.REACT_APP_SECRET_KEY ?? ''
      ).toString();
      // the account data with encrypted password
      const newData = {
        ...reqData,
        password: encryptedPassword,
      };
      await axiosInstance.post<GetResponse>(requests.updateAccount, newData);
      setAccounts((prev) =>
        prev.map((item) => (item._id === reqData._id ? reqData : item))
      );
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occured';
      }
    }
  };

  const deleteAccount = useCallback(async (_id: string | undefined) => {
    try {
      await axiosInstance.post(requests.deleteAccount, {
        _id,
      });
      setAccounts((prev) => prev.filter((item) => item._id !== _id));
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occured';
      }
    }
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const { data } = await axiosInstance.get<GetAccountsResponse>(
          `${requests.getAccounts}/${token}`
        );

        // retrieve account with encrypted passwords
        const decryptedData = data.data.map((item) => {
          const bytes = CryptoJS.AES.decrypt(
            item.password,
            process.env.REACT_APP_SECRET_KEY ?? ''
          );
          const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
          return {
            ...item,
            password: decryptedPassword,
          };
        });
        setAccounts(decryptedData);
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occured';
        }
      }
    };
    getAccounts();
  }, []);

  return (
    <div className='accounts'>
      <h2 className='accounts__title'>My accounts list</h2>
      <GrAddCircle
        size={35}
        className='accounts__add-icon'
        onClick={() => setIsAddingModal(true)}
      />
      <ul className='accounts__list'>
        {accounts.map((account, i) => (
          <li key={i} className='accounts__item'>
            <div
              className='accounts__item-cont'
              onClick={() => openEditModal(account)}
            >
              <FcApproval size={30} />
              <div className='accounts__item-wrap'>
                <p className='accounts__item-title'>{account?.title}</p>
                <p className='accounts__item-login'>{account?.login}</p>
              </div>
            </div>
            <FiDelete onClick={() => deleteAccount(account?._id)} size={25} />
          </li>
        ))}
      </ul>
      <AccountModal
        isEdit={false}
        isOpen={isAddingModal}
        handleClose={handleCloseAddingModal}
        action={addAccount}
      />
      {editData && (
        <AccountModal
          isEdit
          isOpen={isEditModal}
          handleClose={handleCloseEditModal}
          editData={editData}
          action={updateAccount}
        />
      )}
    </div>
  );
};
