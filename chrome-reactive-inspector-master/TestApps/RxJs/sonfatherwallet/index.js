$sonWallet = $('#wallet-son');
$fatherWallet = $('#wallet-father');
$addSon = $('#add-son');
$removeSon = $('#remove-son');

// change the value in the son's wallet
addClick = Rx.Observable.fromEvent($addSon, 'click').mapTo(1);
removeClick = Rx.Observable.fromEvent($removeSon, 'click').mapTo(-1);

eventClick = addClick.merge(removeClick);


function plus(a, b) {
    return a + b
}


sonWalletValue = eventClick.scan(plus, 0)
fatherWalletValue = sonWalletValue
    .map(function (value) {
        return value + 10
    })


sonWalletValue.subscribe(
    function (data) {
        $sonWallet.val(data);
    });
fatherWalletValue.subscribe(
    function (data) {
        $fatherWallet.val(data);
    });