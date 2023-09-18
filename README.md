# ATARA Data Fetching

 This documentation provides details on how to interact with our API. 

## Table of Contents

 [API Endpoints](#api-endpoints)
   - [Fetch Products](#fetch-products)
   - [Fetch Receipts](#fetch-receipts)
   - [Fetch ReceiptProduct](#fetch-receiptproduct)
   - [Fetch TokensIssued](#fetch-tokensissued)
   - [Fetch UserTokensBalance](#fetch-usertokensbalance)
   - [Fetch Rewards](#fetch-rewards)
   - [Search Products](#search-products)
   - [Search Rewards](#search-rewards)
   
   

<br>
<br>



 ## Fetch Receipts


<br>
<small>table row example:</small>
<br>
<br>


| id (receiptId)| createdAt           | userId    |
|------------|------------------|-------------|
|     clmc9j7yo00005p8yf62eb4e7     | 2023-09-09T16:51:04.848Z      | {clerkId} | 

<br>
<br>

| HTTP Method: | endpoints | description |
|----------|----------|----------|
| GET| `/api/receipts/{receiptId}/products` | get all products in one receipt (an array of products) |
| GET| `/api/receipts` | get all receipts  |
| GET |`/api/receipts/{receiptId}` | get one receipt  |
| POST| `/api/receipts` | create new receipt |
| DELETE| `/api/receipts/{receiptId}` | delete receipt |


<br>
<br>

- - -
<br>

## Fetch Products

<br>
<small>table row example:</small>
<br>
<br>

| id (productId) | name | category | business | description | price(in cents) | imageUrl | tokenValue |
|----------|----------|----------|----------|----------|----------|----------|----------|
| clm9hc77q0008vartdhmygks1   | Dr. Bronner's Magic Soaps 16.00 fl oz | nontox | Dr.Bronners         |      Peppermint Liquid Soap is scented with organic peppermint essential oil...      | 1699 |  https://www.drbronner.com/cdn/shop/files/... | 20 |


<br>
<br>

| HTTP Method: | endpoints | description |
|----------|----------|----------|
| GET| `/api/products` | get all products  |
| GET |`/api/products/{productId}` | get one product |
| POST| `/api/products` | create new product |
| DELETE| `/api/products/{productId}` | delete product |

<br>
<br>

- - -
<br>

## Fetch ReceiptProduct
This table constists of __composite primary key__ - unique combinations of foreign keys of __receiptId__ and __productId__. This table keeps track of all receipts that contain approved products.



<br>
<small>table row example:</small>
<br>
<br>

| receiptId| productId           | quantity    | createdAt |
|------------|------------------|-------------|----|
|     clmc9j7yo00005p8yf62eb4e7     | clm9hc77q0005vartd7bmw412      | 3 | 2023-09-10T04:43:03.630Z | 
|     clmc9j7yo00005p8yf62eb4e7     | clm9hma2r000cvartoupiwx2z      | 1 | 2023-09-10T04:44:03.630Z |   



<br>
<br>

| HTTP Method: | endpoints | description |
|----------|----------|----------|
| POST| `/api/receiptProduct` | add product to a receipt |
| GET| `/api/receiptProduct` | get all receipts with all products  within them  |
| DELETE| `/api/receiptProduct/{receiptId}/{productId}` | delete receipt product composite|

<br>
<br>

- - - 

## Fetch TokensIssued
This table has a field of __"issued"__ with a __default value__ of __"false"__. Make sure to change value to __"true"__ when tokens are issued to a user. 


<br>
<small>table row example:</small>
<br>
<br>


| id(tokensIssuedId)| userId          | tokensAmount    | createdAt | issued |
|------------|------------------|-------------|------------|---------|
|     clmfou39500005pe6a8f4iohl    | {clerkId} | 15 | 2023-09-12T02:22:44.926Z | false |

<br>
<br>

| HTTP Method: | endpoints | description |
|----------|----------|----------|
| GET| `/api/tokensIssued` | see all tokensIssued |
| GET| `/api/tokensIssued/{tokensIssuedId}` | see one tokensIssued |
| POST| `/api/tokensIssued` | create new tokensIssued |
| PUT| `/api/tokensIssued/{tokensIssuedId}` | update tokensIssued 


<br>
<br>

- - -


## Fetch UserTokensBalance 

The __primary key__ for this table is derived from the Clerk Object, meaning it is not generated automatically, and you will need to add this value manually.


<br>
<small>table row example:</small>
<br>
<br>


| userId| tokensBalance         | createdAt   |
|------------|------------------|-------------|
|     {clerkId}    | 50 |  2023-09-15T01:52:06.438Z |

<br>
<br>

| HTTP Method: | endpoints | description |
|----------|----------|----------|
| POST| `/api/userTokensBalance` | create new tokens balance for a user |
| GET| `/api/userTokensBalance` | get tokens balance of all users |
| GET| `/api/userTokensBalance/{clerkId}` | see tokens balance of one user |
| PUT| `/api/userTokensBalance/{clerkId}` | update balance of one user |


<br>
<br>

- - -

## Fetch Rewards


<br>
<small>table row example:</small>
<br>
<br>


| id(rewardId)| tokensAmount        | rewardName   |  createdAt |
|------------|------------------|-------------|--------|
|     {clerkId}    | 50 |  gift card | 2023-09-15T02:42:42.293Z  |

<br>
<br>

| HTTP Method: | endpoints | description |
|----------|----------|----------|
| POST| `/api/rewards` | create new reward |
| GET| `/api/rewards` | get all rewards |
| GET| `/api/rewards/{clerkId}` | get one reward |
| PUT| `/api/rewards/{clerkId}` | edit reward |


<br>
<br>

- - -

## Search Products

Search takes a parameter and filters products containing the specified parameter in their product names.

<br>
<br>


| HTTP Method: | endpoints | description |
|----------|----------|----------|
| GET| `/api/search/products/{search term}` | search products |



<br>
<br>

- - -
## Search Rewards

Search takes a parameter and filters rewards containing the specified parameter in their reward names.

<br>
<br>


| HTTP Method: | endpoints | description |
|----------|----------|----------|
| GET| `/api/search/rewards/{search term}` | search rewards |



<br>
<br>

- - -


