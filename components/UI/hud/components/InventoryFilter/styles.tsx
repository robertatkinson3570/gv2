import css from 'styled-jsx/css';

export default css`
    .filters {
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: 1.6rem;
    }

    .filter {
        display: flex;
        flex-direction: column;
        gap: .2rem;
    }

    .filter .name {
        color: var(--col-info-400);
        font-size: 1.8rem;
        line-height: 2.2rem;
    }
`;
