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
    const { data, menu } = this.props;
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
        return <Money />;
      case 'exp':
        return <Exp />;
      case 'change-pass':
        return <ChangePass />;
      case 'forcedown':
        return <Forcedown />
      case 'petsymbol-level':
        return <PetsymbolLevel />;
      case 'prac-level':
        return <PracLevel />;
      case 'prop':
        return <Prop />;
      case 'secure-code':
        return <SecureCode />;
      case 'title':
        return <TitleM />;
      case 'untie-phone':
        return <UntiePhone />;

      case 'clear-secure-code':
        return <ClearSecureCode />;
      case 'unusual-gang':
        return <UnusualGang />;
      case 'unusual-task':
        return <UnusualTask />;

      case 'ban-talk':
        return <BanTalk />;
      case 'ban-log':
        return <BanLog />;
      case 'ban-account':
        return <BanAccount />;

      default:
        break;
    }
  }
}

export default Switch;
