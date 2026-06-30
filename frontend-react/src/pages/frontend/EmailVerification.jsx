import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import Loader from "../../components/common/Loader";
import { accountVerifyConfig } from "../../utils/accountVerify";
import { accountVerify } from "../../services/authService";
import toast from "react-hot-toast";

export default function EmailVerification() {

    //STATUS :- '',success, already_verified, error
    const [status, setStatus] = useState('');
    const [searchParams] = useSearchParams();
    const [data, setData] = useState('');

    const verification = async () => {
        try {
            const token = searchParams.get('token');
            if (token == '' || token == null || token == 'null' || token == undefined) {
                setData(accountVerifyConfig['error']);
                setStatus('error');
                return false;
            }


            const accountVerifyRes = await accountVerify({ token });
            if (accountVerifyRes?.success === true) {
                //toast.success(accountVerifyRes?.message);
                setData(accountVerifyConfig['success']);
                setStatus('success');
            } else {
                const msg = accountVerifyRes?.message || "Something went wrong";
                //toast.error(msg);
                setData(accountVerifyConfig['already_verified']);
                setStatus('already_verified');
            }

            console.log(accountVerifyRes)
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            //toast.error(msg);
            setData(accountVerifyConfig['error']);
            setStatus('error');
        }
    }

    useEffect(() => {
        setData(accountVerifyConfig[status]);
        verification();
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                {status != '' ? <><div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${data.iconBg}`}>
                    <span className={`text-4xl font-bold ${data.iconColor}`}>
                        {data.icon}
                    </span>
                </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-3">
                        {data.title}
                    </h1>

                    <p className="text-slate-600 mb-6">
                        {data.description}
                    </p>

                    <div className={`border rounded-lg p-4 mb-6 ${data.alertClass}`}>
                        <p className="text-sm">
                            {data.alertText}
                        </p>
                    </div>

                    <Link
                        to={data.buttonLink}
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                    >
                        {data.buttonText}
                    </Link></> :
                    <>
                        <Loader loadingTest='Please wait, Your Account Is Verifying...' />
                    </>
                }
            </div>
        </div>
    );
}