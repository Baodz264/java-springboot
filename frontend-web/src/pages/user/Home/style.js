import styled from 'styled-components';

// Container chính full màn
export const HomeWrapper = styled.div`
  background: #f5f5f5;  // nền sáng nhẹ giống Shopee
  padding: 0;            // sát cạnh
  min-height: 100vh;
`;

// Section full-width
export const SectionWrapper = styled.div`
  width: 100%;
  padding: 8px 5px;          // padding nhỏ
  margin-bottom: 12px;       // cách nhau ít
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);

  @media(max-width: 768px){
    padding: 5px 3px;
    margin-bottom: 8px;
  }
`;


// Nếu muốn mỗi card sản phẩm/cate cũng có shadow + hover
export const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover{
    transform: scale(1.03);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
`;




export const SearchWrapper = styled.section`
  width: 100%;
  padding: 40px 0;
  background-color: #f9fafb;

  h2 {
    font-size: 1.6rem;
    font-weight: 600;
    text-align: center;
    color: #222;
    margin-bottom: 30px;
  }

  .loading {
    text-align: center;
    color: #777;
    font-style: italic;
  }

  .not-found {
    text-align: center;
    color: #aaa;
    margin-top: 20px;
  }

  .grid-result {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 25px;
    padding: 0 20px;
  }

  .product-card {
    position: relative;
    border: 1px solid #eee;
    border-radius: 12px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    }

    .discount-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #e53935;
      color: white;
      font-size: 0.8rem;
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .image-box {
      width: 100%;
      height: 220px;
      background-color: #f8f8f8;
      border-radius: 12px 12px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .info {
      padding: 12px 15px;

      h3 {
        font-size: 1rem;
        font-weight: 500;
        color: #333;
        margin-bottom: 6px;
        line-height: 1.4;
        height: 2.8em;
        overflow: hidden;
      }

      .price-box {
        display: flex;
        align-items: center;
        gap: 8px;

        .sale {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
        }

        .old {
          font-size: 0.9rem;
          color: #888;
          text-decoration: line-through;
        }
      }
    }

    .button-group {
      display: flex;
      gap: 8px;
      padding: 10px 15px 15px;

      button {
        flex: 1;
        padding: 8px 0;
        border: none;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.25s ease;
      }

      .btn-detail {
        background: #eee;
        color: #333;

        &:hover {
          opacity: 0.9;
        }
      }

      .btn-buy {
        background: #111;
        color: #fff;

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
`;