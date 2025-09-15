import Home from '@/src/components/Home';

import { CharityWithDiffrence as CharityWithDifference } from '../components/Charity_with_Difference';

import HelpingEachOther from '../components/HelpingEachOther/HelpingEachOther';
import HelpAndDonate from '../components/HelpAndDonate';
import BecomeVolunteer from '../components/BecomeVolunteer';
import { VolunteerTeam , ValueableCustomer } from '../components/About';
import Community from '../components/Home/Community'
import ChildOldCare from '../components/ChildOldCare';
import DonateDifferentWay from '../components/DonateDifferentWay';

import LatestNewsArticle from '../components/LatestNewsArticle';
import CustomCursor from '../components/CustomCursor/CustomCursor';


export default function Page() {
  return (
    <div>
      <CustomCursor />
      <Home />
      <CharityWithDifference />
      <HelpingEachOther/>
      <HelpAndDonate />
      <BecomeVolunteer/>
      <VolunteerTeam/>
      <Community/>
      <ValueableCustomer/>
      <ChildOldCare />
      <DonateDifferentWay />
      <LatestNewsArticle />
    </div>
  );
}
