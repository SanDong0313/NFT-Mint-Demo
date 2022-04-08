import styled from 'styled-components';

export const Styles = styled.div`

    .nft-card {
        background-color: #0000009c;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 2px 2px #ffc107ba;
        cursor: pointer;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
    }

    .nft-card:hover {
        -webkit-transform: scale(1.03, 1.03);
        -moz-transform: scale(1.03, 1.03);
        -ms-transform: scale(1.03, 1.03);
        -o-transform: scale(1.03, 1.03);
        transform: scale(1.03, 1.03);
    }

`