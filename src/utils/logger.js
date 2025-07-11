import axios from "axios";

const LOGGING_API = "http://20.244.56.144/evaluation-service/logs";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhYmhpMTM2MDA0QGdtYWlsLmNvbSIsImV4cCI6MTc1MjIxMTYzMSwiaWF0IjoxNzUyMjEwNzMxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYWJhZTk5NTktZTY2NC00ZGZkLThiMWUtMTI3YWYxMjMzYzVmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWJoaS5zIiwic3ViIjoiYjM5MmFmYWUtYjYzMi00MWRiLTg5NTgtYjI4MzlkNzM5NGY1In0sImVtYWlsIjoiYWJoaTEzNjAwNEBnbWFpbC5jb20iLCJuYW1lIjoiYWJoaS5zIiwicm9sbE5vIjoiMTIyMjUiLCJhY2Nlc3NDb2RlIjoiQ1dicWdLIiwiY2xpZW50SUQiOiJiMzkyYWZhZS1iNjMyLTQxZGItODk1OC1iMjgzOWQ3Mzk0ZjUiLCJjbGllbnRTZWNyZXQiOiJ2d3RZeG1yUkRyeEtaYlBXIn0.T712srRN_LuZ6bbmwlt3NpAs_A2x-oUND-m1JXQ9VJI"; 

export const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      LOGGING_API,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  } catch (err) {
    console.error("Failed to log", err.message);
  }
};
