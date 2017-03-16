$sonWallet = $('#wallet-son');
$fatherWallet = $('#wallet-father');
$addSon = $('#add-son');
$removeSon = $('#remove-son');

// change the value in the son's wallet
addClick = $addSon.asEventStream('click').map(1);
removeClick = $removeSon.asEventStream('click').map(-1);
eventClick = addClick.merge(removeClick);
function plus(a, b) {
    return a + b
}
sonWalletValue = eventClick.scan(0, plus)
fatherWalletValue = sonWalletValue
    .map(function (value) {
        return value + 10
    })
sonWalletValue.assign($sonWallet, "val")
fatherWalletValue.assign($fatherWallet, "val")

