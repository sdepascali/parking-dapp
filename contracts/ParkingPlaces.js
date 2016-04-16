var _blockCosts = web3.toWei(10, "finney");
var parkingplacesContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"getSlotCount","outputs":[{"name":"count","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"amount","type":"uint256"}],"name":"addSlots","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"existsPlace","outputs":[{"name":"exists","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"close","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"atBlock","type":"uint256"}],"name":"getFreeSlotCount","outputs":[{"name":"count","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"atBlock","type":"uint256"},{"name":"toBlock","type":"uint256"}],"name":"calculateEstimatedCosts","outputs":[{"name":"costs","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"blockCosts","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"atBlock","type":"uint256"}],"name":"getNextFreeSlot","outputs":[{"name":"block","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"lat","type":"string"},{"name":"long","type":"string"}],"name":"addPlace","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"parker","type":"address"}],"name":"getReservedBlock","outputs":[{"name":"block","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"places","outputs":[{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"latitude","type":"string"},{"name":"longitude","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"time","type":"uint256"}],"name":"reserveSlot","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"controller","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[{"name":"_blockCosts","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"place","type":"address"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"latitude","type":"string"},{"indexed":false,"name":"longitude","type":"string"}],"name":"PlaceAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"place","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"SlotsAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"place","type":"address"},{"indexed":false,"name":"parker","type":"address"},{"indexed":false,"name":"reservedBlock","type":"uint256"}],"name":"Reservation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Transaction","type":"event"}]);
var parkingplaces = parkingplacesContract.new(
   _blockCosts,
   {
     from: web3.eth.accounts[0], 
     data: '60606040526040516020806110fe83395060806040525160008054600160a060020a031916331790556001819055506110c28061003c6000396000f3606060405236156100a35760e060020a6000350463070d895581146100b457806312ed37dc146100e45780632a2bb4c41461011057806343d726d6146101825780635bfbc3a4146101a157806374dec1e4146102125780638df5c2401461023857806392ca8c6214610241578063ab028078146102aa578063c5804ca714610390578063e557bb4e14610445578063f454624f146104fa578063f77c479114610577575b610589600034111561058b57610002565b60048035600160a060020a0316600090815260036020526040902001545b60408051918252519081900360200190f35b61058960043560243560008233600160a060020a031681600160a060020a0316141515610de257610002565b6100d26004355b6000805b60025481101561073a5782600160a060020a03166002600050828154811015610002576000919091526005027f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0154600160a060020a03161415610745576001915061073f565b610589600054600160a060020a03908116339091161461103857610002565b6100d2600435602435600080805b600160a060020a038516600090815260036020526040902060040154811015610eab57604060002060040180548591908390811015610002579060005260206000209060020201600050600101541161020a57600191909101905b6001016101af565b6100d26004356024356044356000828211156102315750600154828203025b9392505050565b6100d260015481565b6100d2600435602435600080805b600160a060020a038516600090815260036020526040902060040154811015610eab578160001415610eb357604060002060040180548290811015610002579060005260206000209060020201600050600101549150610f34565b60408051602060248035600481810135601f81018590048502860185019096528585526105899581359591946044949293909201918190840183828082843750506040805160209735808a0135601f81018a90048a0283018a019093528282529698976064979196506024919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a01909352828252969897608497919650602491909101945090925082915084018382808284375094965050505050505060008054600160a060020a03908116339091161461074d57610002565b6100d26004356024356000805b600160a060020a03841660009081526003602052604090206004015481101561043e5760406000206004018054600160a060020a0385169190839081101561000257906000526020600020906002020160005054600160a060020a03161415610f3c57600160a060020a0384166000908152600360205260409020600401805482908110156100025790600052602060002090600202016000506001015491505b5092915050565b61058d60043560028054829081101561000257506000526005027f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace810154600160a060020a0316907f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf8101907f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad08101907f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad10184565b6105896004356024356000610f44836000805b600160a060020a0383166000908152600360205260409020600401548110156110b55760406000908120600160a060020a0385169091526004018054439190839081101561000257906000526020600020906002020160005060010154116110ba5780915061073f565b61071d600054600160a060020a031681565b005b565b60408051600160a060020a03861681526080602082018181528654600260018216156101000260001901909116049183018290529192830190606084019060a08501908890801561061f5780601f106105f45761010080835404028352916020019161061f565b820191906000526020600020905b81548152906001019060200180831161060257829003601f168201915b5050848103835286546002600182161561010002600019019091160480825260209190910190879080156106945780601f1061066957610100808354040283529160200191610694565b820191906000526020600020905b81548152906001019060200180831161067757829003601f168201915b5050848103825285546002600182161561010002600019019091160480825260209190910190869080156107095780601f106106de57610100808354040283529160200191610709565b820191906000526020600020905b8154815290600101906020018083116106ec57829003601f168201915b505097505050505050505060405180910390f35b60408051600160a060020a03929092168252519081900360200190f35b600091505b50919050565b60010161011b565b600034111561075b57610002565b61076485610117565b151561094d576002805460018101808355909190828015829011610954576005028160050283600052602060002091820191016109549190610a36565b505050600092835250602080832060408051808201825233808252439185018290526002959095029092018054600160a060020a0319169094178455600193909301558151600160a060020a0389168152608081830181815289519183019190915288517fcc2742fa0fe9a8e7be6200dd139d068ec2db399fe007ed402148902e2465f36e958b958b958b958b959094909392850192606086019260a08701928a82019290918291859183918691600490601f850104600f02600301f150905090810190601f1680156108885780820380516001836020036101000a031916815260200191505b508481038352868181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156108e15780820380516001836020036101000a031916815260200191505b508481038252858181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561093a5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390a15b5050505050565b5050509050846002600050828154811015610002576000829052600581027f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace018054600160a060020a03191690931790925580548692508390811015610002575090517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf60058402018054600082815260209081902092946001831615610100026000190190921691909104601f9081018290048301939291890190839010610b7b57805160ff19168380011785555b50610bab929150610b27565b50506001015b80821115610b3b578054600160a060020a031916815560018181018054600080835592600290821615610100026000190190911604601f819010610b0d57505b5060028201600050805460018160011615610100020316600290046000825580601f10610b3f57505b5060038201600050805460018160011615610100020316600290046000825580601f10610b5d57505b5060048201805460008083559182526020909120610a30916002028101905b80821115610b3b578054600160a060020a03191681556000600191909101908155610ae7565b601f016020900490600052602060002090810190610a7691905b80821115610b3b5760008155600101610b27565b5090565b601f016020900490600052602060002090810190610a9f9190610b27565b601f016020900490600052602060002090810190610ac89190610b27565b82800160010185558215610a24579182015b82811115610a24578251826000505591602001919060010190610b8d565b50508260026000508281548110156100025750600081815291517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad06005850201805481855260209485902091946001821615610100026000190190911693909304601f908101849004820193880190839010610c3a57805160ff19168380011785555b50610c6a929150610b27565b82800160010185558215610c2e579182015b82811115610c2e578251826000505591602001919060010190610c4c565b50508160026000508281548110156100025750600081815291517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad16005850201805481855260209485902091946001821615610100026000190190911693909304601f908101849004820193870190839010610cf957805160ff19168380011785555b50610d29929150610b27565b82800160010185558215610ced579182015b82811115610ced578251826000505591602001919060010190610d0b565b505060028054829081101561000257506000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad2600582020180546001810180835582818380158290116107a1576002028160020283600052602060002091820191016107a19190610ae7565b60408051600160a060020a03861681526020810185905281517f05aa6406f0caddc25939adf73fd4a60dbcf1cd02e34b65c377d367c2b680f337929181900390910190a15b505b505050565b6000341115610df057610002565b610df984610117565b15610ddb57600091505b82821015610d9657600160a060020a03841660009081526003602052604090206004018054600181018083558281838015829011610e5a57600202816002028360005260206000209182019101610e5a9190610ae7565b505050919090600052602060002090600202016000506040805180820190915233808252436020929092018290528254600160a060020a031916178255600191909101555060019190910190610e03565b509392505050565b600160a060020a0385166000908152600360205260409020600401805483919083908110156100025790600052602060002090600202016000506001015411610f3457600160a060020a0385166000908152600360205260409020600401805482908110156100025790600052602060002090600202016000506001015491505b60010161024f565b60010161039d565b9050610f60838360015443820302348190101561104657610002565b600160a060020a0383166000908152600360205260409020600401805433919083908110156100025790600052602060002090600202016000508054600160a060020a0319169091179055600160a060020a0383166000908152600360205260409020600401805483919083908110156100025790600052602060002090600202016000506001015560408051600160a060020a0385811682523316602082015280820184905290517fe5539dfa7b02d6872b4f2334999eaf7331c4e1e22b6db84187d1f302562213909181900360600190a1505050565b600054600160a060020a0316ff5b6110a983825b604051600160a060020a03831690600090839082818181858883f1505060408051938452602084019190915280517f8d6db82aa3f20a3487b6bea41ef75a3605c4348c95cd94e9e46dc27a048f778a938190039091019150a15050565b610ddd3382340361104c565b610002565b60010161050d56', 
     gas: 3000000
   }, function(e, contract){
    if(!e) {
      if(!contract.address) {
        console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
      } else {
        console.log("Contract mined! Address: " + contract.address);
      }
    } else {
        console.log("Error in contract creation: " + e);
    }
})
