import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const SortSelector = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by :RElevence
      </MenuButton>
      <MenuList>
        <MenuItem>relevant</MenuItem>
        <MenuItem>date </MenuItem>
        <MenuItem>name</MenuItem>
        <MenuItem>pop</MenuItem>
        <MenuItem>avg</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
