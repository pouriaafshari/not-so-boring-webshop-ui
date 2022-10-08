

// Show item secound image on hover

function Show_2nd_image(elem) 
{
    setTimeout (
        () => 
        {
            elem.children[0].classList.add('item-1st-image-hide');
            elem.children[1].classList.add('item-2nd-image-show');
        }, 100
    )
}

function Hide_2nd_image(elem) 
{
    setTimeout (
        () => 
        {
            elem.children[0].classList.remove('item-1st-image-hide');
            elem.children[1].classList.remove('item-2nd-image-show');
        }, 200
    )
}


//Generate random items

var ColorSet = 
[
    'Red', 'Black', 'Blue', 'Pink', 'Green', 'Yellow'
]
var ItemSet =
[
    'shirt', 'bag', 'jacket', 'pen', 'glove', 'book'
]
var DescriptionSet =
[
    'A shirt is a cloth garment for the upper body. Originally an undergarment worn exclusively by men.',
    'A bag is a common tool in the form of a non-rigid container.',
    'Jackets are outerwear designed for layering and/or keeping warm.',
    'pen, tool for writing or drawing with a coloured fluid such as ink.',
    'Gloves are either nominally-sized or dimensioned universally.',
    'A good book description is a detailed.'
]

function GenerateItem(n) 
{
    const ItemContainer = document.getElementById('item-container');

    ItemContainer.innerHTML = '';

    for (let i = 0; i < n; i++) 
    {
        const Item = document.createElement('div');
        const ItemImage = document.createElement('div');
        const ItemImage1 = document.createElement('img');
        const ItemImage2 = document.createElement('img');
        const ItemTitle = document.createElement('div');
        const ItemRating = document.createElement('div');
        const ItemDescription = document.createElement('div');
        const ItemPrice = document.createElement('div');

        Item.setAttribute('class', 'item')

        ItemImage.setAttribute('class', 'item-image');
        ItemImage.setAttribute('onmouseenter', 'Show_2nd_image(this)');
        ItemImage.setAttribute('onmouseleave', 'Hide_2nd_image(this)');

        ItemImage1.setAttribute('src', './img/tst.webp');
        ItemImage2.setAttribute('src', './img/tst2.webp');

        ItemTitle.setAttribute('class', 'item-title');
        var ItemSetIndex = Math.floor(Math.random() * ItemSet.length);
        ItemTitle.innerText = ColorSet[Math.floor(Math.random() * ColorSet.length)] + ' ' + ItemSet[ItemSetIndex];

        ItemRating.setAttribute('class', 'item-rating');
        ItemRating.innerHTML = '<span>&#9733;</span> ' + Math.floor(Math.random() * 11).toString() + '/10';

        ItemDescription.setAttribute('class', 'item-description');
        ItemDescription.innerText = DescriptionSet[ItemSetIndex];

        ItemPrice.setAttribute('class', 'item-price');
        ItemPrice.innerHTML = ((Math.floor(Math.random() * 10)+1) * 100).toString() + ' <span>&euro;</span>';


        ItemImage.appendChild(ItemImage1);
        ItemImage.appendChild(ItemImage2);

        Item.appendChild(ItemImage);
        Item.appendChild(ItemTitle);
        Item.appendChild(ItemRating);
        Item.appendChild(ItemDescription);
        Item.appendChild(ItemPrice);

        ItemContainer.appendChild(Item);
    }
}

GenerateItem(15);

//Generate Button function

function GenerateButton() 
{
    const GenerateNumber = document.getElementById('item-generate-number');
    const ItemContainer = document.getElementById('item-container');

    ItemContainer.classList.add('hide-element');

    setTimeout( ()=> 
    {
        GenerateItem(GenerateNumber.value);
        ItemContainer.classList.remove('hide-element');
        ShowPageItems(1);
    }, 400);
}


//Page functions

var CurrentPage = 1;
var TotalPages = 0;

function HideAllItems() 
{
    const ItemContainer = document.getElementById('item-container');

    for (let i = 0; i < ItemContainer.childElementCount; i++) 
    {
        ItemContainer.children[i].style.display='none';
    }    
}

function ShowPageItems(n) 
{
    const ItemContainer = document.getElementById('item-container');

    HideAllItems()

    for (let i = (n-1)*10; i < n*10; i++) 
    {
        if (i < ItemContainer.childElementCount)
        {
            ItemContainer.children[i].style.display='block';
        }
    }

    //Disable Next and Prev button

    if (n == TotalPages) {document.getElementById('next').disabled = true;}
    else {document.getElementById('next').disabled = false;}

    if (n == 1) {document.getElementById('prev').disabled = true;}
    else {document.getElementById('prev').disabled = false;}

    CurrentPage = n;
    CountPages(n);
}
ShowPageItems(1);

function CountPages(n)
{
    const ItemContainer = document.getElementById('item-container');
    const Pages = document.getElementById('pages');

    Pages.innerHTML = '';
    TotalPages = Math.round(ItemContainer.childElementCount/10);

    for (let i = 0; i < TotalPages; i++) 
    {
        if (i+1 == n) { Pages.innerHTML += ' <b>' + (i+1).toString() + '</b> '; }
        else { Pages.innerHTML += ' ' + (i+1).toString() + ' '; }
    }
}

function handleNext()
{
    const ItemContainer = document.getElementById('item-container');

    ItemContainer.classList.add('hide-element');

    setTimeout( ()=> 
    {
        ItemContainer.classList.remove('hide-element');
        ShowPageItems(CurrentPage + 1);
    }, 400);
}
function handlePrev()
{
    const ItemContainer = document.getElementById('item-container');

    ItemContainer.classList.add('hide-element');

    setTimeout( ()=> 
    {
        ItemContainer.classList.remove('hide-element');
        ShowPageItems(CurrentPage - 1);
    }, 400);
}