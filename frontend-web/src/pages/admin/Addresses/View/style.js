import styled from "styled-components";

// Container chính
export const Container = styled.div`
  padding: 20px 40px;
  background-color: #f0f2f5;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;

  h2 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
  }

  .card {
    background-color: #fff;
    padding: 25px 30px;
    border-radius: 10px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
    max-width: 600px;
    margin: 0 auto;
  }

  p {
    font-size: 15px;
    color: #444;
    margin-bottom: 12px;

    b {
      color: #333;
      width: 120px;
      display: inline-block;
    }
  }

  img {
    display: block;
    margin-top: 15px;
    max-width: 120px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
`;
