import React from 'react';

interface IHeaderModal {
    body: React.ReactNode
}

const HeaderModal: React.FC<IHeaderModal> = ({body}) => {
    return (
        <div className="header-modal">
            {body}
        </div>
    );
};

export default HeaderModal;
