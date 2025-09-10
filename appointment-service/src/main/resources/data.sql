-- Create cached_patient table if it doesn't exist
CREATE TABLE IF NOT EXISTS cached_patient (
                                              id UUID PRIMARY KEY,
                                              full_name TEXT,
                                              email TEXT,
                                              updated_at TIMESTAMP
);

-- Create appointment table if it doesn't exist
CREATE TABLE IF NOT EXISTS appointment (
                                           id UUID PRIMARY KEY,
                                           patient_id UUID,
                                           start_time TIMESTAMP,
                                           end_time TIMESTAMP,
                                           reason TEXT,
                                           version BIGINT DEFAULT 0 NOT NULL
);

-- Insert patient into cache if not already present
INSERT INTO cached_patient (id, full_name, email, updated_at)
SELECT
    '123e4567-e89b-12d3-a456-426614174000',
    'John Doe',
    'john.doe@example.com',
    '2025-05-19 09:00:00'
    WHERE NOT EXISTS (
    SELECT 1 FROM cached_patient WHERE id = '123e4567-e89b-12d3-a456-426614174000'
);

-- Insert appointment 1 if not already present
INSERT INTO appointment (id, patient_id, start_time, end_time, reason, version)
SELECT
    '11111111-1111-1111-1111-111111111111',
    '123e4567-e89b-12d3-a456-426614174000',
    '2025-05-20 10:00:00',  -- Well-known date & time
    '2025-05-20 10:30:00',  -- 30-minute slot
    'Initial Consultation',
    0 -- Version starts at 0
    WHERE NOT EXISTS (
    SELECT 1 FROM appointment WHERE id = '11111111-1111-1111-1111-111111111111'
);

-- Insert appointment 2 if not already present
INSERT INTO appointment (id, patient_id, start_time, end_time, reason, version)
SELECT
    '22222222-2222-2222-2222-222222222222',
    '123e4567-e89b-12d3-a456-426614174000',
    '2025-05-21 14:00:00',  -- Well-known date & time
    '2025-05-21 14:45:00',  -- 45-minute slot
    'Follow-up Appointment',
    0 -- Version starts at 0
    WHERE NOT EXISTS (
    SELECT 1 FROM appointment WHERE id = '22222222-2222-2222-2222-222222222222'
);

-- Drop the constraint if it exists (works only if it exists)
ALTER TABLE appointment DROP CONSTRAINT IF EXISTS appointment_unique_patient_start;

-- Re-add the constraint
ALTER TABLE appointment ADD CONSTRAINT appointment_unique_patient_start UNIQUE (patient_id, start_time);
