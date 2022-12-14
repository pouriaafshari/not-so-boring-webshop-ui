

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

function Top_Show_2nd_image(elem) 
{
    setTimeout (
        () => 
        {
            elem.children[0].classList.add('top-item-1st-image-hide');
            elem.children[1].classList.add('top-item-2nd-image-show');
        }, 100
    )
}

function Top_Hide_2nd_image(elem) 
{
    setTimeout (
        () => 
        {
            elem.children[0].classList.remove('top-item-1st-image-hide');
            elem.children[1].classList.remove('top-item-2nd-image-show');
        }, 200
    )
}


//Get images from API

const APIurl = 'https://api.imgflip.com/get_memes';
let MEMEurls = [];
let MEMEnames = [];

async function RandomMEME()
{
    const Response = await fetch(APIurl);
    const Data = await Response.json();

    if (Response.ok)
    {
        for (let i = 0; i < 100; i++) 
        {
            MEMEurls[i] = Data.data.memes[i].url.toString();
            MEMEnames[i] = Data.data.memes[i].name.toString();
        }
    }
}


//Product list object
var productList = [];

//Top Product function
var TopProductId = 0;
function  determineTopProduct(Top, Current)
{
    if (Current.rating > Top.rating) {TopProductId = Current.id; return Current}
    else {TopProductId = Top.id; return Top}
}

function SetTopProduct()
{
    const Image1URL = document.getElementById(TopProductId.toString()).children[0].children[0].getAttribute('src');
    const Image2URL = document.getElementById(TopProductId.toString()).children[0].children[1].getAttribute('src');
    const ProductTitle = document.getElementById(TopProductId.toString()).children[1].innerText;
    const ProductRating = document.getElementById(TopProductId.toString()).children[2].innerHTML;
    const ProductDescription = document.getElementById(TopProductId.toString()).children[3].innerText;
    const ProductPrice = document.getElementById(TopProductId.toString()).children[4].innerHTML;

    document.getElementById('top-image').children[0].setAttribute('src', Image1URL);
    document.getElementById('top-image').children[1].setAttribute('src', Image2URL);
    document.getElementById('top-title').innerText = ProductTitle;
    document.getElementById('top-rating').innerHTML = ProductRating;
    document.getElementById('top-description').innerText = ProductDescription;
    document.getElementById('top-price').innerHTML = ProductPrice;
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

    let j = 0;
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

        Item.setAttribute('class', 'item');
        Item.setAttribute('id', i.toString());

        console.log(MEMEurls[j]);
        ItemImage.setAttribute('class', 'item-image');
        ItemImage.setAttribute('onmouseenter', 'Show_2nd_image(this)');
        ItemImage.setAttribute('onmouseleave', 'Hide_2nd_image(this)');

        if (MEMEurls[j] == undefined)
        {
            ItemImage1.setAttribute('src', './img/tst.webp');
        }
        else
        {
            ItemImage1.setAttribute('src', MEMEurls[j]);
        }

        if (MEMEurls[j+1] == undefined)
        {
            ItemImage2.setAttribute('src', './img/tst2.webp');
        }
        else
        {
            ItemImage2.setAttribute('src', MEMEurls[j+1]);
        }

        ItemTitle.setAttribute('class', 'item-title');

        if (document.getElementById('randomname').checked)
        {
            var ItemSetIndex = Math.floor(Math.random() * ItemSet.length);
            ItemTitle.innerText = ColorSet[Math.floor(Math.random() * ColorSet.length)] + ' ' + ItemSet[ItemSetIndex];
        }
        if (document.getElementById('memename').checked)
        {
            var ItemSetIndex = Math.floor(Math.random() * ItemSet.length);
            ItemTitle.innerText = MEMEnames[j] + ', ' + MEMEnames[j+1];
        }
        

        ItemRating.setAttribute('class', 'item-rating');
        var RatingNumber = Math.floor(Math.random() * 11);
        ItemRating.innerHTML = '<span>&#9733;</span> ' + RatingNumber.toString() + '/10';

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

        productList[i] = { rating: RatingNumber, id: i};

        j = j+2;
        if (j >= 100) {j = 0};
    }
}


//Generate Button function

function GenerateButton() 
{
    const GenerateNumber = document.getElementById('item-generate-number');
    const ItemContainer = document.getElementById('item-container');

    ItemContainer.classList.add('hide-element');
    document.getElementById('top-div').classList.add('hide-element');

    setTimeout( ()=> 
    {
        GenerateItem(GenerateNumber.value);
        ItemContainer.classList.remove('hide-element');
        document.getElementById('top-div').classList.remove('hide-element');
        ShowPageItems(1);

        productList.reduce(determineTopProduct);
        SetTopProduct();
    }, 300);
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



//Search Function

function searchProductsByName()
{
    const SearchBar = document.getElementById('search');
    const Items = document.querySelectorAll('.item');
    const SearchValue = SearchBar.value.toLowerCase();
    
    document.getElementById('page-nav').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').children[0].innerText = 'Result for "' + SearchValue + '"';

    const ItemContainer = document.getElementById('item-container');

    ItemContainer.classList.add('hide-element');

    setTimeout( ()=> 
    {
        ItemContainer.classList.remove('hide-element');

        for (let i = 0; i < Items.length; i++) 
        {
            if (Items[i].innerText.toLowerCase().indexOf(SearchValue) == -1) 
            {
                Items[i].style.display = 'none';
            }   
            else
            {
                Items[i].style.display = 'block';
            }
        }

        if (SearchValue == '') 
        {
            ShowPageItems(1);
            document.getElementById('page-nav').style.display = 'block';
            document.getElementById('result').style.display = 'none';
        }

    }, 400);
}

//Search with Enter key

document.addEventListener('keypress', function (e) 
{
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        searchProductsByName();
        return false;
   }

});

//Hide Logo when scroll down

window.addEventListener('scroll', () =>
{
    const Header = document.getElementById('logo');
    Header.classList.toggle('visable', window.scrollY == 0);
})




//Call Functions

window.onload = ()=>
{
    RandomMEME(); 

    setTimeout( ()=> 
    {
        GenerateItem(20);
        ShowPageItems(1);

        productList.reduce(determineTopProduct);
        SetTopProduct();
    }, 300);

    setTimeout( ()=> 
    {
        document.getElementById('content').classList.remove('hide-element');
    }, 800);
}