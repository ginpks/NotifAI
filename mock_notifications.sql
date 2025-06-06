-- This data is for testing extraction of news notifications from the database to be displayed in the inbox.
TRUNCATE TABLE
  notificationrecipients,
  newsnotifications,
  claimnotifications,
  notifications
RESTART IDENTITY
CASCADE;

BEGIN;

INSERT INTO Notifications (userid, type, title, body, isread, isarchived, datecreated) VALUES
('john_doe', 'news', 'Breaking News: Tech Innovation', 'Exciting new tech developments are on the horizon.', false, false, NOW()),
('john_doe', 'news', 'Market Update: Stocks Surge', 'The stock market has seen a significant surge today.', false, false, NOW()),
('john_doe', 'news', 'Health Alert: New Guidelines', 'New health guidelines have been released by the authorities.', false, false, NOW()),
('john_doe', 'news', 'Sports News: Championship Results', 'The championship results are in, and it was a close call.', false, false, NOW()),
('john_doe', 'news', 'Entertainment: Movie Premiere', 'A highly anticipated movie is premiering this weekend.', false, false, NOW()),
('john_doe', 'news', 'Travel: New Destination', 'A new travel destination has been discovered.', false, false, NOW()),
('john_doe', 'news', 'Food: Gourmet Recipe', 'Try out this new gourmet recipe for a delightful meal.', false, false, NOW()),
('john_doe', 'news', 'Fashion: Latest Trends', 'Check out the latest fashion trends for this season.', false, false, NOW()),
('john_doe', 'news', 'Home: Decor Ideas', 'Get inspired with these new home decor ideas.', false, false, NOW()),
('john_doe', 'news', 'Books: New Release', 'A new book release is making waves in the literary world.', false, false, NOW()),
('john_doe', 'news', 'Science: Breakthrough Discovery', 'Scientists have made a breakthrough discovery.', false, false, NOW()),
('john_doe', 'news', 'Business: New Partnership', 'A new partnership has been formed in the business world.', false, false, NOW()),
('john_doe', 'news', 'Education: New Courses', 'New courses are being offered for professional development.', false, false, NOW()),
('john_doe', 'news', 'Music: New Album', 'A new album has just been released by a popular artist.', false, false, NOW()),
('john_doe', 'news', 'Art: New Exhibition', 'A new art exhibition is opening this month.', false, false, NOW()),
('john_doe', 'news', 'Environment: Conservation Efforts', 'New conservation efforts are underway.', false, false, NOW()),
('john_doe', 'news', 'Technology: New Gadget', 'A new gadget is set to revolutionize the tech industry.', false, false, NOW()),
('john_doe', 'news', 'Finance: Investment Tips', 'Here are some new investment tips for you.', false, false, NOW()),
('john_doe', 'news', 'Fitness: New Workout', 'Try out this new workout routine for better fitness.', false, false, NOW()),
('john_doe', 'news', 'Lifestyle: Wellness Tips', 'Here are some wellness tips for a healthier lifestyle.', false, false, NOW()),
('john_doe', 'news', 'Politics: New Policy', 'A new policy has been announced by the government.', false, false, NOW()),
('john_doe', 'news', 'Economics: Market Analysis', 'Here is a detailed market analysis for today.', false, false, NOW()),
('john_doe', 'news', 'Social: Community Event', 'A community event is being organized this weekend.', false, false, NOW()),
('john_doe', 'news', 'Culture: Festival Announcement', 'A new cultural festival has been announced.', false, false, NOW()),
('john_doe', 'news', 'History: New Discovery', 'A new historical discovery has been made.', false, false, NOW()),
('john_doe', 'news', 'Space: New Mission', 'A new space mission is being planned.', false, false, NOW()),
('john_doe', 'news', 'Weather: Forecast Update', 'Here is the latest weather forecast update.', false, false, NOW()),
('john_doe', 'news', 'Animals: Wildlife Conservation', 'New efforts are being made for wildlife conservation.', false, false, NOW()),
('john_doe', 'news', 'Plants: Gardening Tips', 'Here are some new gardening tips for you.', false, false, NOW()),
('john_doe', 'news', 'Vehicles: New Model', 'A new vehicle model has been released.', false, false, NOW()),

-- claims
('joy_smiles', 'claim', 'Accident claim pending', 'your claim has successfully processed and is awaiting final authorization for release', false, false, NOW()),
('joy_smiles', 'claim', 'Missing Documents and Appointment Request for Claim #7574743', 'Dear John Doe, 

This email concerns your claim (#7574743) submitted on May 1, 2025. To expedite the processing of your claim, we require additional documentation. Please provide the following as soon as possible: Police Verification Report, Medical Records. To submit these, please make an appointment with one of our claims representative to discuss your expedite request further. Please go to tbe portal and choose a convenient time for you by May 10,2025', false, false, NOW()),
('joy_smiles', 'claim', 'request for appointment', 'your next steps to accept your claim require an appoinment to you nearest insurance liason. Please do so at your convenience by May 10,2025.', false, false, NOW());

-- Insert into NewsNotifications table (30 inserts)
INSERT INTO NewsNotifications (notificationid, expirationdate, type) VALUES
(1, '2024-08-15', 'urgent'),
(2, '2024-08-20', 'general'),
(3, '2024-08-10', 'alert'),
(4, '2024-08-01', 'general'),
(5, '2024-08-25', 'promotion'),
(6, '2024-08-18', 'general'),
(7, '2024-08-05', 'promotion'),
(8, '2024-08-12', 'general'),
(9, '2024-08-22', 'promotion'),
(10, '2024-08-08', 'general'),
(11, '2024-08-16', 'urgent'),
(12, '2024-08-21', 'general'),
(13, '2024-08-09', 'promotion'),
(14, '2024-08-02', 'general'),
(15, '2024-08-26', 'promotion'),
(16, '2024-08-19', 'general'),
(17, '2024-08-06', 'urgent'),
(18, '2024-08-13', 'general'),
(19, '2024-08-23', 'promotion'),
(20, '2024-08-07', 'general'),
(21, '2024-08-17', 'urgent'),
(22, '2024-08-24', 'general'),
(23, '2024-08-11', 'promotion'),
(24, '2024-08-03', 'general'),
(25, '2024-08-27', 'promotion'),
(26, '2024-08-20', 'general'),
(27, '2024-08-07', 'urgent'),
(28, '2024-08-14', 'general'),
(29, '2024-08-24', 'promotion'),
(30, '2024-08-08', 'general');

INSERT INTO claimnotifications (notificationid, insuredname, claimantname, tasktype,       duedate,     lineofbusiness, priority, iscompleted) VALUES
(31, 'John Doe', 'John Doe', 'Upload Photos & Estimate', '2025-05-05', 'Auto',     'LOW_PRIORITY',   false),
(32, 'John Doe', 'John Doe', 'Missing Documentation and Appointment for Claim #7574743',    '2025-05-10', 'Property', 'HIGH_PRIORITY', false),
(33,'John Doe', 'John Doe', 'Appointment', '2025-05-10','Renters Insurance', 'HIGH_PRIORITY', false);

-- Insert into NotificationRecipient table (30 inserts - all to john_doe)
INSERT INTO NotificationRecipients (notificationid, recipientid, datesent) VALUES
(1, 'john_doe', NOW()),
(2, 'john_doe', NOW()),
(3, 'john_doe', NOW()),
(4, 'john_doe', NOW()),
(5, 'john_doe', NOW()),
(6, 'john_doe', NOW()),
(7, 'john_doe', NOW()),
(8, 'john_doe', NOW()),
(9, 'john_doe', NOW()),
(10, 'john_doe', NOW()),
(11, 'john_doe', NOW()),
(12, 'john_doe', NOW()),
(13, 'john_doe', NOW()),
(14, 'john_doe', NOW()),
(15, 'john_doe', NOW()),
(16, 'john_doe', NOW()),
(17, 'john_doe', NOW()),
(18, 'john_doe', NOW()),
(19, 'john_doe', NOW()),
(20, 'john_doe', NOW()),
(21, 'john_doe', NOW()),
(22, 'john_doe', NOW()),
(23, 'john_doe', NOW()),
(24, 'john_doe', NOW()),
(25, 'john_doe', NOW()),
(26, 'john_doe', NOW()),
(27, 'john_doe', NOW()),
(28, 'john_doe', NOW()),
(29, 'john_doe', NOW()),
(30, 'john_doe', NOW()),

-- 31 and 32 are claims
(31, 'john_doe', NOW()),
(32, 'john_doe', NOW()),
(33, 'john_doe', NOW());

COMMIT;
