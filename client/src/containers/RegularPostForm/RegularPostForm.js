/* eslint-disable indent */
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';

import { FormItem, Button } from 'components';
import { validationSchema } from 'utils';
import {
  createRegularPostAsync,
  getRegularPostsAsync,
} from 'redux/modules/regularPost';
import { handleChangeFileInput } from 'utils/handler/formHandler';

import PropTypes from 'prop-types';
import {
  container,
  heading,
  formItem,
  buttonContainer,
  cancelButton,
} from './RegularPostForm.module.scss';

import top100Mountains from 'data/top100Mountains';

const RegularPostForm = ({ formType }) => {
  const history = useHistory();
  const params = useParams();

  const userId = useSelector(state => state.auth.userInfo._id);
  const userName = params.userName;
  const mountainName = params.mountainName;
  const dispatch = useDispatch();

  const handleClickCancelButton = () => {
    const path = userName
      ? `/profile/${userName}/reviews`
      : mountainName
      ? `/mountains/${mountainName}/reviews`
      : '/reviews';

    history.push(path);
  };

  return (
    <div className={container}>
      <p className={heading}>멋진 리뷰를 작성해주세요~</p>
      <Formik
        initialValues={{
          title: '',
          mountainName: '',
          imageURL: '',
          content: '',
        }}
        validationSchema={validationSchema.regularPost}
        onSubmit={async values => {
          const formData = new FormData();
          const newPostObj = {
            ...values,
            publisherID: userId,
            postdate: new Date(),
          };

          Object.keys(newPostObj).forEach(key => {
            formData.append(key, newPostObj[key]);
          });

          const newPostData = await dispatch(createRegularPostAsync(formData));
          dispatch(getRegularPostsAsync());

          const newPostId = newPostData.regularPost._id;

          const path = userName
            ? `/profile/${userName}/reviews/${newPostId}`
            : mountainName
            ? `/mountains/${mountainName}/reviews/${newPostId}`
            : `/reviews/${newPostId}`;

          history.push(path);
        }}
      >
        {({ setFieldValue, handleBlur, handleChange }) => (
          <Form>
            <FormItem
              inputProps={{
                id: 'title',
                name: 'title',
                formType: 'text',
                type: 'text',
              }}
              descProps={{
                content: '매력적인 제목으로 내 리뷰에 이목을 끌어보세요',
              }}
              headingProps={{ level: 3, content: '제목' }}
              className={formItem}
            />
            <FormItem
              headingProps={{ level: 3, content: '등산한 산' }}
              descProps={{
                content: '등산한 산을 지정해주세요',
              }}
              inputProps={{
                id: 'mountainName',
                name: 'mountainName',
                formType: 'select',
                placeholder: '등산한 산을 지정해주세요',
                setFieldValue,
                handleBlur,
                handleChange,
                datas: top100Mountains,
              }}
              className={formItem}
            />
            <FormItem
              inputProps={{
                id: 'imageURL',
                name: 'imageURL',
                formType: 'file',
                type: 'file',
                label: '파일선택',
                onChange: handleChangeFileInput,
                setFieldValue,
              }}
              descProps={{
                content: '멋진 사진으로 내 리뷰에 이목을 끌어보세요',
              }}
              headingProps={{ level: 3, content: '등산한 산 이미지' }}
              className={formItem}
            />
            <FormItem
              inputProps={{
                id: 'content',
                name: 'content',
                formType: 'textarea',
              }}
              descProps={{
                content: '내가 등반한 산을 자랑해주세요',
              }}
              headingProps={{ level: 3, content: '리뷰 상세 글' }}
              className={formItem}
            />
            <div className={buttonContainer}>
              <Button
                secondary
                type="button"
                className={cancelButton}
                onClick={handleClickCancelButton}
              >
                취소하기
              </Button>
              <Button>{formType === 'create' ? '등록하기' : '수정하기'}</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

RegularPostForm.defaultProps = {
  formType: 'create',
};

RegularPostForm.propTypes = {
  formType: PropTypes.string,
};

export default RegularPostForm;
