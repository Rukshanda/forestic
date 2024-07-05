import React, { useEffect, useState } from "react";
import AuthService from "../appwrite/authServices"; // Adjust the path as necessary
import user from "../images/user.png";
import Loader from "./Loader"
const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  const fetchAccounts = async () => {
    try {
      const allAccounts = await AuthService.listUserDocuments();

      setAccounts(allAccounts.documents);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  if (error) {
    return <div>Error fetching accounts: {error}</div>;
  }

  return (
    <div className="bg-yellow-300 p-[10px] rounded-[20px] text-[black] glowEffect">
      {accounts.length ? (
        <ul>
          {accounts.map((account) => (
            <li
              key={account.$id}
              className="flex flex-row items-center w-[100%]  p-[6px] bg-[#ffffffb1] mt-[10px] mb-[10px] rounded-[15px]"
            >
              <div className="rounded-full bg-yellow-300 w-[40px] h-[40px] p-[10px]">
                <img src={user} alt="" width="80px" height="80px" />
              </div>
              <span className="text-[1.1rem] font-semibold uppercase pl-[10px]">
                {account.userName}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <Loader/>
      )}
    </div>
  );
};

export default Accounts;
