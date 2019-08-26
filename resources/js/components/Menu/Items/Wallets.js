import React from 'react';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { wallets: state.wallets };
};

const Wallets = ({wallets}) => { 
    const style = {borderCollapse: "collapse"};

    return (
    <div className="flex mb-4">
        <div className="w-1/2 bg-white-400 h-auto p-4">
            <div className="inline-block relative w-full">
                <select className="block appearance-none w-1/2 float-left bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-4 mr-2">
                    <option>-- All coins/tokens --</option>
                    {wallets.wallets.map((e, key) => {
                        return <option key={key} value={e.value}>{e.name}</option>;
                    })}
                </select>

                <button className="bg-blue-500 w-1/4 float-left hover:bg-blue-700 text-white font-bold py-2 px-4 pull-right mt-4 rounded">
                    Create Wallet
                </button>

                <table className="text-left m-4" style={style}>
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">My Wallets</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-blue-lightest">
                            <td className="py-4 px-6 border-b border-grey-light">Conversations</td>
                            <td className="py-4 px-6 border-b border-grey-light text-center">❌</td>
                        </tr>
                        <tr className="hover:bg-blue-lightest">
                            <td className="py-4 px-6 border-b border-grey-light">Question-Buttons</td>
                            <td className="py-4 px-6 border-b border-grey-light text-center">❌</td>
                        </tr>
                        <tr className="hover:bg-blue-lightest">
                            <td className="py-4 px-6 border-b border-grey-light">Image Attachment</td>
                            <td className="py-4 px-6 border-b border-grey-light text-center">✅ </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="w-1/2 bg-white-500 h-64"></div>
    </div>
    );
}

const Wallet = connect(mapStateToProps)(Wallets);

export default Wallet;