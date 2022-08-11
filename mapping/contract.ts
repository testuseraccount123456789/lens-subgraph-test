import { BigInt } from "@graphprotocol/graph-ts"
import { Approval, ApprovalForAll, BaseInitialized, Collected, CollectModuleWhitelisted, CollectNFTDeployed, CollectNFTInitialized, CommentCreated, DefaultProfileSet, DispatcherSet, EmergencyAdminSet, FeeModuleBaseConstructed, Followed, FollowModuleSet, FollowModuleWhitelisted, FollowNFTDelegatedPowerChanged, FollowNFTDeployed, FollowNFTInitialized, FollowNFTTransferred, FollowNFTURISet, FollowsApproved, GovernanceSet, MirrorCall, MirrorCreated, ModuleBaseConstructed, ModuleGlobalsCurrencyWhitelisted, ModuleGlobalsGovernanceSet, ModuleGlobalsTreasuryFeeSet, ModuleGlobalsTreasurySet, PostCreated, ProfileCreated, ProfileCreatorWhitelisted, ProfileImageURISet, ReferenceModuleWhitelisted, StateSet, Transfer } from "../generated/Contract/Contract"
import { Profile, SocialGraph, FollowApproved, Mirror, FollowNftTransferred, HandleGovernanceSet, HandleModuleBaseConstructed, HandleModuleGlobalsCurrencyWhitelisted, HandleModuleGlobalsGovernanceSet } from "../generated/schema"

export function handleApproval(event: Approval): void {

}

export function handleApprovalForAll(event: ApprovalForAll): void {

}

export function handleBaseInitialized(event: BaseInitialized): void {

}

export function handleCollectModuleWhitelisted(event: CollectModuleWhitelisted): void {

}

export function handleCollectNFTDeployed(event: CollectNFTDeployed): void {

}

export function handleCollectNFTInitialized(event: CollectNFTInitialized): void {

}

export function handleCollectNFTTransferred(event: CollectNFTInitialized): void {

}

export function handleCollected(event: Collected): void {

}

export function handleCommentCreated(event: CommentCreated): void {

}

export function handleDefaultProfileSet(event: DefaultProfileSet): void {

}

export function handleDispatcherSet(event: DispatcherSet): void {

}

export function handleEmergencyAdminSet(event: EmergencyAdminSet): void {

}

export function handleFeeModuleBaseConstructed(event: FeeModuleBaseConstructed): void {

}

export function handleFollowModuleSet(event: FollowModuleSet): void {

}

export function handleFollowModuleWhitelisted(event: FollowModuleWhitelisted): void {

}

export function handleFollowNFTDelegatedPowerChanged(event: FollowNFTDelegatedPowerChanged): void {

}

export function handleFollowNFTDeployed(event: FollowNFTDeployed): void {

}

export function handleFollowNFTInitialized(event: FollowNFTInitialized): void {

}
//start here
export function handleFollowNFTTransferred(event: FollowNFTTransferred): void {


  let nft = FollowNftTransferred.load(event.params.profileId.toHexString())
  if (nft == null) {
    nft = new FollowNftTransferred(event.params.profileId.toHexString())
    nft.from = event.params.from.toString()
    nft.to = event.params.to.toString()
    nft.timestamp = event.params.timestamp
    nft.followNFTID = event.params.followNFTId
    nft.profileId = event.params.profileId
    nft.save()
  } else {
    nft.from = event.params.from.toString()
    nft.to = event.params.to.toString()
    nft.timestamp = event.params.timestamp
    nft.followNFTID = event.params.followNFTId
    nft.profileId = event.params.profileId
    nft.save()
  }
  
}

export function handleFollowNFTURISet(event: FollowNFTURISet): void {

  let entity = Profile.load(event.params.profileId.toString());

  if (!entity) {
    let entity = new Profile(event.params.profileId.toString());
    entity.followNFTURI = event.params.followNFTURI;
    entity.save();
  } else {

    entity.followNFTURI = event.params.followNFTURI;
    entity.save();
  }

};

export function handleFollowed(event: Followed): void {
  let entity = SocialGraph.load(event.params.follower.toHexString());

  if (!entity) {
    let entity = new SocialGraph(event.params.follower.toHexString());
    let newFollowingList: string[] = [];
    for (let index = 0; index < event.params.profileIds.length; index++) {
      const profileId = event.params.profileIds[index].toString();
      newFollowingList.push(profileId);
    }

    entity.following = newFollowingList;
    entity.save();
  }
  else {
    let newFollowingList: string[] = entity.following;
    for (let index = 0; index < event.params.profileIds.length; index++) {
      const profileId = event.params.profileIds[index].toString();
      newFollowingList.push(profileId);
    }
    entity.following = newFollowingList;
    entity.save();
  };
}

export function handleFollowsApproved(event: FollowsApproved): void {
  let profile = FollowApproved.load(event.params.profileId.toString());
  if (!profile) {
    let profile = new FollowApproved(event.params.profileId.toString());
    let newFollowingList: string[] = [];
    for (let index = 0; index < event.params.addresses.length; index++) {
      const profileId = event.params.addresses[index].toString();
      if (event.params.approved[index]) {
        newFollowingList.push(profileId);
      }

    }
    profile.addresses = newFollowingList;
    profile.save();
  } else {
    let newFollowingList: string[] = profile.addresses;
    for (let index = 0; index < event.params.addresses.length; index++) {
      const profileId = event.params.addresses[index].toString();
      if (event.params.approved[index]) {
        newFollowingList.push(profileId);
      }
    }
    profile.addresses = newFollowingList;
    profile.save();
  }




}

export function handleGovernanceSet(event: GovernanceSet): void {
  let entity = HandleGovernanceSet.load(event.params.caller.toString())

  if (!entity) {
    entity = new HandleGovernanceSet(event.params.caller.toString())
    entity.prevGovernance = event.params.prevGovernance.toString();
    entity.newGovernance = event.params.newGovernance.toString();
    entity.timestamp = event.params.timestamp;
    entity.save();
  } else {

    entity.prevGovernance = event.params.prevGovernance.toString();
    entity.newGovernance = event.params.newGovernance.toString();
    entity.timestamp = event.params.timestamp;
    entity.save();
  }
}

export function handleMirrorCreated(event: MirrorCreated): void {

  let entity = Mirror.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new Mirror(event.transaction.hash.toString());
    entity.profileId = event.params.profileId;
    entity.pubId = event.params.pubId;
    entity.profileIdPointed = event.params.profileIdPointed;
    entity.pubIdPointed = event.params.pubIdPointed;
    entity.referenceModule = event.params.referenceModule;
    entity.referenceModuleReturnData = event.params.referenceModuleReturnData;
    entity.timestamp = event.params.timestamp;
    entity.save();

  } else {
    entity.profileId = event.params.profileId;
    entity.pubId = event.params.pubId;
    entity.profileIdPointed = event.params.profileIdPointed;
    entity.pubIdPointed = event.params.pubIdPointed;
    entity.referenceModule = event.params.referenceModule;
    entity.referenceModuleReturnData = event.params.referenceModuleReturnData;
    entity.timestamp = event.params.timestamp;
    entity.save();
  }

  

};

export function handleModuleBaseConstructed(event: ModuleBaseConstructed): void {
  let entity = HandleModuleBaseConstructed.load(event.params.hub.toString());
  if (!entity) {
    entity = new HandleModuleBaseConstructed(event.params.hub.toString());
    entity.hub = event.params.hub;
    entity.timestamp = event.params.timestamp;
    entity.save();
  } else {
    entity.hub = event.params.hub;
    entity.timestamp = event.params.timestamp;
    entity.save();
  }

  


}

export function handleModuleGlobalsCurrencyWhitelisted(event: ModuleGlobalsCurrencyWhitelisted): void {
  let entity = HandleModuleGlobalsCurrencyWhitelisted.load(event.params.currency.toString());
  if (!entity) {
    entity = new HandleModuleGlobalsCurrencyWhitelisted(event.params.currency.toString());
    entity.currency = event.params.currency.toString();
    entity.prevWhitelisted = event.params.prevWhitelisted;
    entity.whitelisted = event.params.whitelisted;
    entity.save();
  } else {
    entity.currency = event.params.currency.toString();
    entity.prevWhitelisted = event.params.prevWhitelisted;
    entity.whitelisted = event.params.whitelisted;
    entity.save();
  }

  
}

export function handleModuleGlobalsGovernanceSet(event: ModuleGlobalsGovernanceSet): void {
  let entity = HandleModuleGlobalsGovernanceSet.load(event.transaction.hash.toString());
  if (!entity) {
    entity = new HandleModuleGlobalsGovernanceSet(event.transaction.hash.toString());
    entity.prevGovernance = event.params.prevGovernance.toString();
    entity.newGovernance = event.params.newGovernance.toString();
    entity.save();
  } else {
    entity.prevGovernance = event.params.prevGovernance.toString();
    entity.newGovernance = event.params.newGovernance.toString();
    entity.save();
  }

  
}
//end here
export function handleModuleGlobalsTreasuryFeeSet(event: ModuleGlobalsTreasuryFeeSet): void {

}

export function handleModuleGlobalsTreasurySet(event: ModuleGlobalsTreasurySet): void {

}

export function handlePostCreated(event: PostCreated): void {

}

export function handleProfileCreated(event: ProfileCreated): void {
  let profile = new Profile(event.params.profileId.toString())

  profile.profileId = event.params.profileId
  profile.creator = event.params.to
  profile.followNFTURI = event.params.followNFTURI

  profile.save()
}

export function handleProfileCreatorWhitelisted(event: ProfileCreatorWhitelisted): void {

}

export function handleProfileImageURISet(event: ProfileImageURISet): void {

}

export function handleReferenceModuleWhitelisted(event: ReferenceModuleWhitelisted): void {

}

export function handleStateSet(event: StateSet): void {

}

export function handleTransfer(event: Transfer): void {

}
