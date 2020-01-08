import React, {useState} from "react";
import styled from "styled-components";
import {NavLink} from 'react-router-dom';
import NavigationMenu from '../NavigationMenuList';
import Tooltip from '@material-ui/core/Tooltip';
import {ItemsInterface} from "@components/App/MenuContainer/types/types";

interface Props {
    name: string;
    icon: string;
    nextMenu: ItemsInterface[];
    isNestedItem: string;
    addNestedMenuContent?(val: any): void;
    path: string;
}

const MenuItem: React.FC<Props> = (props: Props) => {
  const [toggler, setToggler] = useState<boolean>(false);

  const Item = styled.li`
    list-style-type: none; 
    font-size: 0; 
    padding: 8px; 
    text-align: center; 
    margin: auto; 
    position: relative; 
    & a {
      color:  #9ba6b2;
      display: block;
      width: 40px;
      padding: 10px;
      border-radius: 8px;
      position: relative;
      margin: 0 auto;
    }
    & a:hover {
      background-color: #e1f6ff;
    }    
  `;
  const MenuItemIcon = styled.i`
    font-size: 20px;    
  `;
  const ArrowSubmenu = styled.i`
    position: absolute;
    font-size: 11px;
    right: 0;
    margin-top: 8px;
    color:  #9ba6b2;
  `;

  let link;
  let linkContent = (<>
    <MenuItemIcon className={props.icon} />
    {props.nextMenu && <ArrowSubmenu className={toggler ? "fas fa-chevron-right" : "fas fa-chevron-down"} />}
  </>);

  if ( props.nextMenu ) {
    const linkClickListener = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      props.addNestedMenuContent!(<NavigationMenu nestedRoute={props.path} menuItems={props.nextMenu}/>);
      setToggler(!toggler);
        console.log(toggler)
    };
    link = (<NavLink
        activeStyle={{
            color: `#24c0fd`,
            backgroundColor: `#e1f6ff`
        }}
      to={props.path}
      onClick={(event)=>{linkClickListener(event)}}
      >
       {linkContent}
     </NavLink>);
  } else {
    const linkClickListener = () => {
        if (props.addNestedMenuContent) {
            props.addNestedMenuContent('');
        }
    };
    link = (<NavLink
      to={props.path}
      activeStyle={{
         color: `#24c0fd`,
         backgroundColor: `#e1f6ff`
     }}
     onClick={linkClickListener}>
       {linkContent}
     </NavLink>
     );
  }

  return (
    <Item>
        <Tooltip title={props.name} placement="right" arrow>
            {link}
        </Tooltip>
    </Item>
  );
};

export default MenuItem;
