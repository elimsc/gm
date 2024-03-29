import React from 'react';

import BasicInfo from './playerinfo/BasicInfo';
import BagInfo from './playerinfo/BagInfo';
import WarehouseInfo from './playerinfo/WarehouseInfo';
import EquipInfo from './playerinfo/EquipInfo';
import DecInfo from './playerinfo/DecInfo';
import SkillInfo from './playerinfo/SkillInfo';
import TitleInfo from './playerinfo/TitleInfo';
import PetInfo from './playerinfo/PetInfo';
import TaskInfo from './playerinfo/TaskInfo';
import HomeInfo from './playerinfo/HomeInfo';
import EmailInfo from './playerinfo/EmailInfo';
import MarriageInfo from './playerinfo/MarriageInfo';
import Money from './gmact/Money';
import Level from './gmact/Level';
import ChangePass from './gmact/ChangePass';
import Forcedown from './gmact/Forcedown';
import PetsymbolLevel from './gmact/PetsymbolLevel';
import PracLevel from './gmact/PracLevel';
import Prop from './gmact/Prop';
import SecureCode from './gmact/SecureCode';
import UntiePhone from './gmact/UntiePhone';
import GmIns from './gmact/GmIns';
import ClearSecureCode from './clear/ClearSecureCode';
import UnusualGang from './clear/UnusualGang';
import UnusualTask from './clear/UnusualTask';
import BanTalk from './ban/BanTalk';
import BanAccount from './ban/BanAccount';
import Award from './gmact/Award';
import BanAccountLog from './ban/BanAccountLog';
import BanTalkLog from './ban/BanTalkLog';
import Pet from './gmact/Pet'
import Player from './gmact/Player';
import AwardD from './gmact/AwardD';
import Reissue from './gmact/Reissue';
import Export from './Export';
import DelMail from './gmact/DelMail';
import UntieR2 from './gmact/UntieR2';
import BlackList from './ban/BlackList';


class Switch extends React.PureComponent {



  render() {
    const { data, menu, guid, part_id, uid, global } = this.props;
    switch (menu) {
      case 'basic-info':
        return <BasicInfo data={data} />;
      case 'bag-info':
        return <BagInfo data={data} />;
      case 'warehouse-info':
        return <WarehouseInfo data={data} />;
      case 'equip-info':
        return <EquipInfo data={data} />;
      case 'dec-info':
        return <DecInfo data={data} />;
      case 'skill-info':
        return <SkillInfo data={data} />;
      case 'title-info':
        return <TitleInfo data={data} />;
      case 'pet-info':
        return <PetInfo data={data} />;
      case 'task-info':
        return <TaskInfo data={data} />;
      case 'home-info':
        return <HomeInfo data={data} />;
      case 'email-info':
        return <EmailInfo data={data} />;
      case 'marriage-info':
        return <MarriageInfo data={data} />;

      case 'award':
        return guid ? <Award guid={guid} part_id={part_id} /> : null;
      case 'award-d':
        return guid ? <AwardD guid={guid} part_id={part_id} /> : null;
      case 'reissue':
        return guid ? <Reissue guid={guid} part_id={part_id} global={global} /> : null;
      case 'pet':
        return guid ? <Pet guid={guid} part_id={part_id} /> : null;
      case 'player':
        return guid ? <Player guid={guid} part_id={part_id} /> : null;
      case 'money':
        return guid ? <Money guid={guid} part_id={part_id} /> : null;
      case 'level':
        return guid ? <Level guid={guid} part_id={part_id} /> : null;
      case 'change-pass':
        return guid ? <ChangePass guid={guid} part_id={part_id} uid={uid} /> : null;
      case 'forcedown':
        return guid ? <Forcedown guid={guid} part_id={part_id} /> : null;
      case 'petsymbol-level':
        return guid ? <PetsymbolLevel guid={guid} part_id={part_id} /> : null;
      case 'prac-level':
        return guid ? <PracLevel guid={guid} part_id={part_id} /> : null;
      case 'prop':
        return guid ? <Prop guid={guid} part_id={part_id} /> : null;
      case 'secure-code':
        return guid ? <SecureCode guid={guid} part_id={part_id} uid={uid} /> : null;
      case 'untie-phone':
        return guid ? <UntiePhone guid={guid} part_id={part_id} uid={uid} /> : null;
      case 'untie-r2':
        return guid ? <UntieR2 guid={guid} part_id={part_id} uid={uid} /> : null;
      case 'del-mail':
        return guid ? <DelMail guid={guid} part_id={part_id} /> : null;
      case 'gm-ins':
        return guid ? <GmIns guid={guid} part_id={part_id} /> : null;

      case 'clear-secure-code':
        return guid ? <ClearSecureCode guid={guid} part_id={part_id} /> : null;
      case 'unusual-gang':
        return guid ? <UnusualGang guid={guid} part_id={part_id} /> : null;
      case 'unusual-task':
        return guid ? <UnusualTask guid={guid} part_id={part_id} /> : null;

      case 'ban-talk':
        return guid ? <BanTalk guid={guid} part_id={part_id} uid={uid} /> : null;
      case 'ban-account':
        return guid ? <BanAccount guid={guid} part_id={part_id} uid={uid} /> : null;
      case 'ban-account-info':
        return guid ? <BanAccountLog data={data} /> : null;
      case 'uid-ban-account-info':
        return <BanAccountLog data={data} />;
      case 'black-list-info':
        return uid ? <BlackList uid={uid} data={data} /> : null;
      case 'ban-talk-info':
        return guid ? <BanTalkLog data={data} /> : null;

      case 'export':
        return <Export part_id={part_id} />

      default:
        break;
    }
  }
}

export default Switch;
