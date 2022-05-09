import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../UI/Input';
import Button from '../UI/Button';
import Message from '../UI/Message';
import { signup, setError } from '../../store/actions/authActions';
import { RootState } from '../../store';

const SignUp: FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if(error) {
        dispatch(setError(''));
      }
    }
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if(error) {
      dispatch(setError(''));
    }
    setLoading(true);
    dispatch(signup({ email, password, firstName }, () => setLoading(false)));
  }

  return(
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Đăng ký</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          <Input 
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            placeholder="Tên tài khoản"
            label="Tên tài khoản"
          />
          <Input 
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Địa chỉ email"
            label="Địa chỉ email"
          />
          <Input 
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Mật khẩu"
            label="Mật khẩu"
          />
          <Button text={loading ? "Chờ..." : "Đăng ký"} className="is-primary is-fullwidth mt-5" disabled={loading} />
        </form>
      </div>
    </section>
  );
}

export default SignUp;