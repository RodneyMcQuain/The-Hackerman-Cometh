import React, { useState, useEffect } from 'react';
import { Popover } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import '../../styles/tutorial/popover.scss';

const LG_BREAKPOINT = 992;

interface TutorialPopoverProps {
    children: JSX.Element;
    action: string;
    description: string;
    isVisible?: boolean;
    alignment?: 'right'
        | 'rightBottom'
        | 'rightTop'
        | 'bottom'
        | 'bottomLeft'
        | 'bottomRight'
        | 'left'
        | 'leftBottom'
        | 'leftTop'
        | 'top'
        | 'topLeft'
        | 'topRight';
}

const TutorialPopover = ({ children, action, description, isVisible = true, alignment = 'right' }: TutorialPopoverProps) => {
    const [placement, setPlacement] = useState<string>(alignment);
    const [shouldClose, setShouldClose] = useState<boolean>(false);

    useEffect(() => {
        const placementPosition = document.documentElement.clientWidth < LG_BREAKPOINT
            ? 'bottom'
            : alignment;
        setPlacement(placementPosition);
    }, []);

    return (
        <Popover
            overlayClassName="low-z-index max-width"
            placement={placement}
            title={<PopoverTitle action={action} setShouldClose={setShouldClose} />}
            content={description}
            visible={isVisible && !shouldClose}
        >
            {children}
        </Popover>
    );
};

const PopoverTitle = ({ action, setShouldClose }) => (
    <div className="popover-title-container">
        <span>{action}</span>
        <CloseOutlined className="close-icon" onClick={() => setShouldClose(true)} />
    </div>
);

export default TutorialPopover;