import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './_accounts.scss';
import { FcApproval } from 'react-icons/fc';
import { FiDelete } from 'react-icons/fi';
import { GrAddCircle } from 'react-icons/gr';
import { AccountModal } from '../AccountModal/AccountModal';
import { IAccountData } from '../../entities';

type Props = {};

export const Accounts: FC<Props> = () => {
  // const [data, setData] = useState({
  //   login: '',
  //   password: '',
  //   confirmPassword: '',
  // });
  const [isAddingModal, setIsAddingModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<null | IAccountData>(null);

  const handleCloseAddingModal = () => setIsAddingModal((prev) => !prev);
  const handleCloseEditModal = () => setIsEditModal((prev) => !prev);

  const deleteItem = (id: string) => {};
  const openEditModal = (data: IAccountData) => {
    setEditData(data);
    setIsEditModal(true);
  };

  return (
    <div className='accounts'>
      <h2 className='accounts__title'>My accounts list</h2>
      <GrAddCircle
        size={35}
        className='accounts__add-icon'
        onClick={() => setIsAddingModal(true)}
      />
      <ul className='accounts__list'>
        <li className='accounts__item'>
          <div
            className='accounts__item-cont'
            onClick={() =>
              openEditModal({
                title: 'youtube',
                login: 'maxmaxov@gmail.com',
                password: '12312312',
              })
            }
          >
            <FcApproval size={30} />
            <div className='accounts__item-wrap'>
              <p className='accounts__item-title'>Youtube</p>
              <p className='accounts__item-login'>maksnelson636@gmail.com</p>
            </div>
          </div>
          <FiDelete onClick={() => deleteItem('3')} size={25} />
        </li>
      </ul>
      <AccountModal
        isEdit={false}
        isOpen={isAddingModal}
        handleClose={handleCloseAddingModal}
      />
      {editData && (
        <AccountModal
          isEdit
          isOpen={isEditModal}
          handleClose={handleCloseEditModal}
          editData={editData}
        />
      )}
    </div>
  );
};
