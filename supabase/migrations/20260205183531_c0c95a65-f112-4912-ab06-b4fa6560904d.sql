-- Add DELETE policy for lucy_conversations (GDPR compliance)
CREATE POLICY "Admins can delete conversations"
ON lucy_conversations FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));