import * as React from "react";
import { Menu, MenuItem } from "@mui/material";

interface DropdownMenuItemProps {
  children: React.ReactNode;
  menu?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  keepOpen?: boolean;
}

interface DropdownProps {
  trigger: React.ReactElement;
  menu: React.ReactNode;
  keepOpen?: boolean;
  isOpen?: boolean;
  onOpen?: (anchor: HTMLElement | null) => void;
  minWidth?: number;
}

export const Dropdown: React.FC<DropdownProps> = React.forwardRef(
  (
    {
      trigger,
      menu,
      keepOpen: keepOpenGlobal,
      isOpen: controlledIsOpen,
      onOpen: onControlledOpen,
      minWidth,
    },
    ref
  ) => {
    const [isInternalOpen, setInternalOpen] =
      React.useState<HTMLElement | null>(null);

    const isOpen = controlledIsOpen || isInternalOpen;

    let anchorRef = React.useRef<HTMLElement | null>(null);
    if (ref) {
      anchorRef = ref as React.RefObject<HTMLElement>;
    }

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      if (React.Children.count(menu) > 0) {
        onControlledOpen
          ? onControlledOpen(event.currentTarget)
          : setInternalOpen(event.currentTarget);
      }
    };

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as Node)
      ) {
        return;
      }

      handleForceClose();
    };

    const handleForceClose = () => {
      onControlledOpen ? onControlledOpen(null) : setInternalOpen(null);
    };

    const renderMenu = (
      menuItem: React.ReactElement<DropdownMenuItemProps>,
      index: number
    ) => {
      const { keepOpen: keepOpenLocal, ...props } = menuItem.props;

      let extraProps = {};
      if (props.menu) {
        extraProps = {
          parentMenuOpen: isOpen,
        };
      }

      return React.createElement(menuItem.type, {
        ...props,
        key: index,
        ...extraProps,
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();

          if (!keepOpenGlobal && !keepOpenLocal) {
            handleClose(event);
          }

          if (menuItem.props.onClick) {
            menuItem.props.onClick(event);
          }
        },
        children: props.menu
          ? React.Children.map(props.menu, renderMenu)
          : props.children,
      });
    };

    return (
      <>
        {React.cloneElement(trigger, {
          onClick: isOpen ? handleForceClose : handleOpen,
          ref: anchorRef,
        })}

        <Menu
          sx={{ minWidth: minWidth ?? 0, color: "inherit" }} // Replaced PaperProps with sx prop for styling
          anchorEl={isOpen}
          open={!!isOpen}
          onClose={handleClose}
        >
          {React.Children.map(menu, renderMenu)}
        </Menu>
      </>
    );
  }
);

Dropdown.displayName = "Dropdown";

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = (props) => {
  return (
    <MenuItem
      sx={{ display: "flex", justifyContent: "space-between" }}
      {...props}
    >
      {props.children}
      {props.menu && <div>{props.menu}</div>}
    </MenuItem>
  );
};
