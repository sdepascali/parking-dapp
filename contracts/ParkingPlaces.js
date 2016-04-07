//contract code in one single line
var ppSource = 'contract ParkingPlaces { struct Place { bool enabled; bytes32 name; address owner; int24[2][2] location; Slot[] slots; } struct Slot { address parker; uint reservedBlock; } address controller = msg.sender; mapping (address => uint) private balances; mapping (bytes32 => Place) places; modifier only_controller() { if (msg.sender != controller) { throw; _ } } modifier only_placeowner(bytes32 name) { if (msg.sender != places[name].owner) { throw; _ } } modifier only_future(uint reservedBlock) { if (reservedBlock <= block.number + 50) { throw; _ } } modifier only_enabled(bytes32 name) { if (places[name].enabled != true) { throw; _ } } modifier only_not_existing(bytes32 name) { if (places[name].name != 0 && name != "") { throw; _ } } modifier only_existing(bytes32 name) { if (places[name].name == 0) { throw; _ } } event PlaceUpdated(bytes32 name); event SlotReservation(bytes32 name, address parker, uint reservedBlock); function GetNextFreeSlot(bytes32 name) private only_existing(name) returns (uint sid) { for (uint i = 0; i < places[name].slots.length; i++) { if (places[name].slots[i].reservedBlock <= block.number) { return i; } } throw; } function ParkingPlaces() {} function ChangeController(address newController) only_controller { controller = newController; } function ReserveSlot(bytes32 name, uint reservedBlock) only_future(reservedBlock) only_enabled(name) { uint sid = GetNextFreeSlot(name); uint amount = (reservedBlock - block.number) * 10 finney; PayReservation(name, amount); places[name].slots[sid].parker = msg.sender; places[name].slots[sid].reservedBlock = reservedBlock; SlotReservation(name, msg.sender, reservedBlock); } function PayReservation(bytes32 name, uint value) private { if (balances[msg.sender] < value) { throw; } if (balances[places[name].owner] + value < balances[places[name].owner]) { throw; } balances[msg.sender] -= value; balances[places[name].owner] += value; } function UpdatePlaceLocation(bytes32 name, int24[2][2] newLocation) only_placeowner(name) only_existing(name) { places[name].location = newLocation; PlaceUpdated(name); } function AddPlace(bytes32 name, int16[2][2] location, address owner) only_controller only_not_existing(name) { places[name].name = name; places[name].enabled = false; places[name].location = location; places[name].owner = owner; PlaceUpdated(name); } function AddSlots(bytes32 name, uint amount) only_placeowner(name) only_existing(name) { for (uint i = 0; i < amount; i++) { places[name].slots.push(Slot(msg.sender, block.number)); } PlaceUpdated(name); } function DisablePlace(bytes32 name) only_placeowner(name) only_existing(name) { places[name].enabled = false; PlaceUpdated(name); } function EnablePlace(bytes32 name) only_placeowner(name) only_existing(name) { places[name].enabled = true; PlaceUpdated(name); } function () { throw; } function close() only_controller { selfdestruct(controller); } }';
//compile contract code
var ppCompiled = web3.eth.compile.solidity(ppSource);

//Creates a contract object for a solidity contract.
var ppContract = web3.eth.contract(ppCompiled.ParkingPlaces.info.abiDefinition);
//deploy contract to ethereum from first account with 300000 gas 
//error-first callback with first argument e as error and second argument contract as successful response
var pp = ppContract.new({from:web3.eth.accounts[0], data: ppCompiled.ParkingPlaces.code, gas: 300000}, function(e, contract){
    if(!e) {
      if(!contract.address) {
        console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
      } else {
        console.log("Contract mined! Address: " + contract.address);
      }
    }
});
