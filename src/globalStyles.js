import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 4px;
  background: none;
  // white-space: nowrap;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  outline: none;
  border: 2px solid #fff;
  cursor: pointer;
  // overflow: hidden;
  // position: relative;
  // &:before {
  //   background: white;
  //   content: "";
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   z-index: -1;
  //   transition: all 0.6s ease;
  //   width: 100%;
  //   height: 0%;
  //   transform: translate(-50%, -50%) rotate(45deg);
  // }
  &:hover {
    background: white;
    transition: 0.3s;
    color: black;
  }
`;

export const FlipCardBtn = styled.button`
  border: none;
  text-decoration: underline;
  background-color: transparent;
  cursor: pointer;
  color: blue;
  font-size: 15px;
`;

export const CardContainer = styled.div`
  border-radius: 10px;
  box-shadow: 1px 1px 20px -1px grey;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 30px 30px;
`;
