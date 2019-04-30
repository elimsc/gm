import React from 'react';

import BasicInfo from './playerinfo/BasicInfo';
import BagInfo from './playerinfo/BagInfo';
import WarehouseInfo from './playerinfo/WarehouseInfo';
import EquipInfo from './playerinfo/EquipInfo';
import SkillInfo from './playerinfo/SkillInfo';
import TitleInfo from './playerinfo/TitleInfo';
import PetInfo from './playerinfo/PetInfo';
import TaskInfo from './playerinfo/TaskInfo';
import HomeInfo from './playerinfo/HomeInfo';
import EmailInfo from './playerinfo/EmailInfo';
import MarriageInfo from './playerinfo/MarriageInfo';
import Money from './gmact/Money';
import Exp from './gmact/Exp';
import ChangePass from './gmact/ChangePass';
import Forcedown from './gmact/Forcedown';
import PetsymbolLevel from './gmact/PetsymbolLevel';
import PracLevel from './gmact/PracLevel';
import Prop from './gmact/Prop';
import SecureCode from './gmact/SecureCode';
import UntiePhone from './gmact/UntiePhone';
import TitleM from './gmact/TitleM';
import ClearSecureCode from './clear/ClearSecureCode';
import UnusualGang from './clear/UnusualGang';
import UnusualTask from './clear/UnusualTask';
import BanTalk from './ban/BanTalk';
import BanLog from './ban/BanLog';
import BanAccount from './ban/BanAccount';


class Switch extends React.PureComponent {


  render() {
    const { data, menu, guid } = this.props;
    switch (menu) {
      case 'basic-info':
        return <BasicInfo data={data} />;
      case 'bag-info':
        return <BagInfo data={data} />;
      case 'warehouse-info':
        return <WarehouseInfo data={data} />;
      case 'equip-info':
        return <EquipInfo data={data} />;
      case 'skill-info':
        return <SkillInfo data={data} />;
      case 'title-info':
        return <TitleInfo data={data} />;
      case 'pet-info':
        return <PetInfo data={data} />;
      case 'task-info':
        return <TaskInfo data={data} />;
      case 'home-info':
        return <HomeInfo />;
      case 'email-info':
        return <EmailInfo />;
      case 'marriage-info':
        return <MarriageInfo />;

      case 'money':
        return guid ? <Money guid={guid} /> : null;
      case 'exp':
        return guid ? <Exp guid={guid} /> : null;
      case 'change-pass':
        return guid ? <ChangePass guid={guid} /> : null;
      case 'forcedown':
        return guid ? <Forcedown guid={guid} /> : null;
      case 'petsymbol-level':
        return guid ? <PetsymbolLevel guid={guid} /> : null;
      case 'prac-level':
        return guid ? <PracLevel guid={guid} /> : null;
      case 'prop':
        return guid ? <Prop guid={guid} /> : null;
      case 'secure-code':
        return guid ? <SecureCode guid={guid} /> : null;
      case 'title':
        return guid ? <TitleM guid={guid} /> : null;
      case 'untie-phone':
        return guid ? <UntiePhone guid={guid} /> : null;

      case 'clear-secure-code':
        return guid ? <ClearSecureCode guid={guid} /> : null;
      case 'unusual-gang':
        return guid ? <UnusualGang guid={guid} /> : null;
      case 'unusual-task':
        return guid ? <UnusualTask guid={guid} /> : null;

      case 'ban-talk':
        return guid ? <BanTalk guid={guid} /> : null;
      case 'ban-log':
        return guid ? <BanLog guid={guid} /> : null;
      case 'ban-account':
        return guid ? <BanAccount guid={guid} /> : null;

      default:
        break;
    }
  }
}

export default Switch;
