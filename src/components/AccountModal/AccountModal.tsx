import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './_accountModal.scss';
import { FcApproval } from 'react-icons/fc';
import {
  AiOutlineCloseCircle,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from 'react-icons/ai';
import { IAccountData } from '../../entities';

type Props = {
  isEdit: boolean;
  isOpen: boolean;
  handleClose: () => void;
  editData?: IAccountData | null;
};

export const AccountModal: FC<Props> = ({
  isEdit,
  isOpen,
  handleClose,
  editData = null,
}) => {
  const [data, setData] = useState(
    isEdit && editData
      ? editData
      : {
          title: '',
          login: '',
          password: '',
        }
  );

  const [isPassVisible, setIsPassVisible] = useState(false);

  const toggleVisible = () => setIsPassVisible((prev) => !prev);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // onSubmit();
  };

  return (
    <div className={`accountModal ${isOpen && 'accountModal--visible'}`}>
      <div className='accountModal__background'></div>
      <form className='accountModal__form'>
        <AiOutlineCloseCircle
          size={30}
          className='accountModal__close'
          onClick={handleClose}
        />
        <h2 className='accountModal__title'>
          {!isEdit ? 'Adding an element' : 'Edit an element'}
        </h2>
        <div className='accountModal__label'>
          <label htmlFor='title'>Title</label>
          <input
            value={data.title}
            onChange={handleChange}
            type='text'
            name='title'
          />
        </div>
        <div className='accountModal__label'>
          <label htmlFor='login'>Login</label>
          <input
            value={data.login}
            onChange={handleChange}
            type='text'
            name='login'
          />
        </div>
        <div className='accountModal__label'>
          <label htmlFor='password'>Password</label>
          <div className='accountModal__input'>
            <input
              value={data.password}
              onChange={handleChange}
              type={isPassVisible ? 'text' : 'password'}
              name='password'
            />
            {isPassVisible ? (
              <AiOutlineEyeInvisible
                className='accountModal__eye-icon'
                size={28}
                onClick={toggleVisible}
              />
            ) : (
              <AiOutlineEye
                className='accountModal__eye-icon'
                size={28}
                onClick={toggleVisible}
              />
            )}
          </div>
        </div>
        <button className='accountModal__button' type='submit'>
          Save
        </button>
      </form>
    </div>
  );
};
