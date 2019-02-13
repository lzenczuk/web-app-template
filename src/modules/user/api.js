import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";

ScatterJS.plugins( new ScatterEOS() );

const eosMainNetwork = {
    blockchain:'eos',
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host:'nodes.get-scatter.com',
    port:443,
    protocol:'https'
};

export const connectToMainEosNetwork = () => ScatterJS.scatter.connect('MyEosAppName');

export const loginEosAccount = () => {

    console.log("call login")

    const requiredFields = {
        accounts:[ eosMainNetwork ]
    };

    return ScatterJS.scatter.getIdentity(requiredFields).then( id => {
        console.log("receive identity: "+JSON.stringify(id))

        return id;
    });
};

