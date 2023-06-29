const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { assert } = require("chai");

describe("MultiSigWallet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMultiSigWalletFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner1, owner2] = await ethers.getSigners();

    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const multiSigWallet = await MultiSigWallet.deploy([owner1, owner2]);

    return { multiSigWallet, owner1, owner2 };
  }

  describe("Deployment", function () {
    it("Should work to deposit", async function () {
      const { multiSigWallet, owner1, owner2 } = await loadFixture(deployMultiSigWalletFixture);
      await multiSigWallet.connect(owner1).deposit({ value: ethers.parseEther("1") });
      await multiSigWallet.connect(owner2).deposit({ value: ethers.parseEther("2") });
      assert.equal(await ethers.provider.getBalance(multiSigWallet.target), ethers.parseEther("3"));
    });
  });

});
