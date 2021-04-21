/* eslint-disable indent */
import React from 'react';
import Icon from 'components/Icon/Icon';
import {
  selectBoxContainer,
  selectBoxInput,
  selectBoxList,
} from './SelectBox.module.scss';
import PropTypes, { string, bool, arrayOf, object } from 'prop-types';
import classNames from 'classnames';

const SelectBox = ({ field, ...inputProps }) => {
  const { id, isOpened, inputValue, datas, handler } = inputProps;
  const selectBoxClasses = {
    container: selectBoxContainer,
    input: selectBoxInput,
    list: selectBoxList,
  };

  const filtered = datas.filter(data => {
    return data.content.toLowerCase().includes(inputValue.toLowerCase());
  });

  const { onFocus, onClick, onChange } = handler;

  /* 상위 컴포넌트에서 사용할 이벤트와 상태 값 --------------------------------------------
  // mock datas
  const datas = [
    { id: 1, content: '가리산' },
    { id: 2, content: '가리왕산' },
    { id: 3, content: '가야산' },
    { id: 4, content: '가지산' },
    { id: 5, content: '감악산' },
    { id: 6, content: '강천산' },
    { id: 7, content: '계룡산' },
    { id: 8, content: '계방산' },
    { id: 9, content: '공작산' },
    { id: 10, content: '관악산' },
    { id: 11, content: '구병산' },
    { id: 12, content: '금산' },
    { id: 13, content: '금수산' },
    { id: 14, content: '금오산' },
    { id: 15, content: '금정산' },
    { id: 16, content: '깃대봉' },
    { id: 17, content: '금오산' },
    { id: 18, content: '내연산' },
    { id: 19, content: '내장산' },
    { id: 20, content: '대둔산' },
    { id: 21, content: '대암산' },
    { id: 22, content: '대야산' },
    { id: 23, content: '덕숭산' },
    { id: 24, content: '덕유산' },
    { id: 25, content: '덕항산' },
    { id: 26, content: '도락산' },
    { id: 27, content: '도봉산' },
    { id: 28, content: '두륜산' },
    { id: 29, content: '두타산' },
    { id: 30, content: '마니산' },
    { id: 31, content: '마이산' },
    { id: 32, content: '명성산' },
    { id: 33, content: '명지산' },
    { id: 34, content: '모악산' },
    { id: 35, content: '무등산' },
    { id: 36, content: '무학산' },
    { id: 37, content: '미륵산' },
    { id: 38, content: '민주지산' },
    { id: 39, content: '방장산' },
    { id: 40, content: '방태산' },
    { id: 41, content: '백덕산' },
    { id: 42, content: '백암산' },
    { id: 43, content: '백운산' },
    { id: 44, content: '변산' },
    { id: 45, content: '북한산' },
    { id: 46, content: '비슬산' },
    { id: 47, content: '삼악산' },
    { id: 48, content: '서대산' },
    { id: 49, content: '선운산' },
    { id: 50, content: '설악산' },
    { id: 51, content: '성인봉' },
    { id: 52, content: '소백산' },
    { id: 53, content: '소요산' },
    { id: 54, content: '속리산' },
    { id: 55, content: '신불산' },
    { id: 56, content: '연화산' },
    { id: 57, content: '오대산' },
    { id: 58, content: '오봉산' },
    { id: 59, content: '용문산' },
    { id: 60, content: '용화산' },
    { id: 61, content: '운문산' },
    { id: 62, content: '운악산' },
    { id: 63, content: '운장산' },
    { id: 64, content: '월악산' },
    { id: 65, content: '월출산' },
    { id: 66, content: '유명산' },
    { id: 67, content: '응봉산' },
    { id: 68, content: '장안산' },
    { id: 69, content: '재약산' },
    { id: 70, content: '적상산' },
    { id: 71, content: '점봉산' },
    { id: 72, content: '조계산' },
    { id: 73, content: '주왕산' },
    { id: 74, content: '주흘산' },
    { id: 75, content: '지리산' },
    { id: 76, content: '지리산' },
    { id: 77, content: '천관산' },
    { id: 78, content: '천마산' },
    { id: 79, content: '천성산' },
    { id: 80, content: '천태산' },
    { id: 81, content: '청량산' },
    { id: 82, content: '추월산' },
    { id: 83, content: '축령산' },
    { id: 84, content: '치악산' },
    { id: 85, content: '칠갑산' },
    { id: 86, content: '태백산' },
    { id: 87, content: '태화산' },
    { id: 88, content: '팔공산' },
    { id: 89, content: '팔봉산' },
    { id: 90, content: '팔영산' },
    { id: 91, content: '한라산' },
    { id: 92, content: '화악산' },
    { id: 93, content: '화왕산' },
    { id: 94, content: '황매산' },
    { id: 95, content: '황석산' },
    { id: 96, content: '황악산' },
    { id: 97, content: '황장산' },
    { id: 98, content: '희양산' },
  ];
  
  const [isOpened, setIsOpened] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('등산할 산');

  const handler = {
    onFocus: handleFocusInput,
    onClick: {
      inputButton: handleOpenSelectBox,
      listButton: handleClickItem,
    },
    onChange: handleInputValue,
  };

  const handleFocusInput = e => {
    setIsOpened(true);
    e.target.select();
  };

  const handleOpenSelectBox = () => {
    setIsOpened(!isOpened);
  };

  const handleClickItem = e => {
    setInputValue(e.target.textContent);
    setIsOpened(false);
  };

  const handleInputValue = e => {
    setInputValue(e.target.value);
    setIsOpened(true);
  };

  
 -------------------------------------- */

  return (
    <div className={selectBoxClasses.container} tabIndex="-1">
      <div className={selectBoxClasses.input}>
        <input
          id={id}
          type="text"
          onFocus={onFocus}
          onChange={onChange}
          value={inputValue}
        />
        <button type="button" onClick={onClick.inputButton}>
          <Icon shape={isOpened ? 'selectClose' : 'selectOpen'} />
        </button>
      </div>
      {isOpened && (
        <ul className={selectBoxClasses.list} role="listbox">
          {filtered.length === 0
            ? datas.map(data => {
                return (
                  <li key={data.id} role="option">
                    <button onClick={onClick.listButton}>{data.content}</button>
                  </li>
                );
              })
            : filtered.map(item => {
                return (
                  <li key={item.id} role="option">
                    <button onClick={onClick.listButton}>{item.content}</button>
                  </li>
                );
              })}
        </ul>
      )}
    </div>
  );
};

// isOpened, inputValue, datas, handler

SelectBox.defaultProps = {
  isOpened: false,
  inputValue: '',
  handler: {},
  datas: [],
};

SelectBox.propTypes = {
  isOpened: bool.isRequired,
  inputValue: string.isRequired,
  hadler: PropTypes.shape({
    onFocus: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
    onClick: {
      inputButton: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOf([null]),
      ]),
      listButton: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOf([null]),
      ]),
    },
    onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  }),
  datas: arrayOf(object),
};

export default SelectBox;
