$(document).ready(function(){
	var deck1 = new Deck(1);
	deck1.createHand(5);

	var $deckArea = $('#deckArea');
	var $discardArea = $('#discardArea');

	$('#handsArea').append(deck1.renderHands());
	$deckArea.append(deck1.renderDeck());

	//Button Handlers for the Deck
	$('#shuffle').click(function(){
		deck1.shuffle(6);
		$('#cards').remove();
		$deckArea.append(deck1.renderDeck());
	});

	$('#dealCard').click(function(){
		deck1.dealAll("up", false);
	});

	$('#gatherDiscards').click(function(){
		deck1.gatherCards(true);
		$('#cards').remove();
		deck1.flipAll('up');
		$deckArea.append(deck1.renderDeck());
	});

	$('#gather').click(function(){
		deck1.gatherCards(false);
		$('#cards').remove();
		deck1.flipAll('up');
		deck1.deselectAll();
		$deckArea.append(deck1.renderDeck());
	});

	$('#hideDeck').click(function(){
		deck1.flipAll();
	});

	$('#felt').click(function(event){
		$card = $(event.target).closest('.card');
		if($card.length)
		{
			if($card.parent().is('.cards-in-hand'))
			{
				$card.toggleClass('selected');
			}
		}
	});

	//Buttons for Each Hand
  $.each(deck1.hands, function(i){
    this.$ui
      .append($('<div />').addClass('button_row')
        .append(
          $('<input />').attr({ type: 'button', value: 'Hit Me', id: 'hands-' + i + '-hit' })
            .click(function(){ deck1.dealCard(i, "up", false) }))
        .append(
          $('<input />').attr({type: 'button', value: 'Discard Selected', id: 'hands-'+ i +'-discard'})  //, disabled: 'true'
            .click(function(){

              for(j = deck1.hands[i].cards.length - 1; j >= 0; j--)
              {
                if(deck1.hands[i].cards[j].$ui.hasClass('selected'))
                {
                  deck1.hands[i].cards[j].$ui.removeClass('selected');
                  deck1.hands[i].cards[j].flip('down');
                  deck1.grabDiscard(deck1.hands[i].discard(j));
                }
              }

              $('#discardPile').remove();
              $discardArea.append(deck1.renderDiscard());
            }))
        .append(
          $('<input />').attr({type: 'button', value: 'toString', id: 'hands-'+i+'-toString'})
            .click(function(){ alert( deck1.hands[i].toString() ); }))
    );
  });
});