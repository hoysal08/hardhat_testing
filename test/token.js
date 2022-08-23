const { expect } = require("chai");
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

// describe("Token contract",function(){
//     it("Deployment should assign the total supply of tokens to the owner",async function(){
//         const [owner]=await ethers.getSigners();

//         // console.log("Signers object:",owner);

//         const Token=await ethers.getContractFactory("Token");

//         const hardhatToken=await Token.deploy();

//         const ownerbal=await hardhatToken.balanceOf(owner.address);
//         // console.log("Owner address:",owner.address);
//         // console.log("Owner bal:",ownerbal);

//         expect(await hardhatToken.totalSupply()).to.equal(ownerbal)
//     })
//     it("Checking for Transfer function",async function(){
//          const[owner,addr1,addr2]=await ethers.getSigners();

//          const Token=await ethers.getContractFactory("Token");
//          const token=await Token.deploy();

//          await token.transfer(addr1.address,10);
//          expect(await token.balanceOf(owner.address)).to.equal(await token.totalSupply()-10);
//          expect(await token.balanceOf(addr1.address)).to.equal(10);
//          const addr1bal=await token.balanceOf(addr1.address);
//          await token.connect(addr1).transfer(addr2.address,5);
//          expect(await token.balanceOf(addr1.address)).to.equal(addr1bal-5);
//          expect(await token.balanceOf(addr2.address)).to.equal(5);
//     })

// })

describe("Token Contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
     Token = await ethers.getContractFactory("Token");
     hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {
    
    it("Should set the right owne balance", async function () {
      const ownerbal = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerbal);
    });
    
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Checking for Transfer function", async function () {
      await hardhatToken.transfer(addr1.address, 10);
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        (await hardhatToken.totalSupply()) - 10
      );
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);
      const addr1bal = await hardhatToken.balanceOf(addr1.address);
      await hardhatToken.connect(addr1).transfer(addr2.address, 5);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(addr1bal - 5);
      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
    });
  });
});
